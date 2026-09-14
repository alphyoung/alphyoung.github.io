import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {marked} from 'marked';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const source=path.join(root,'understanding/europe/markdown');
const out=path.join(root,'_site');
fs.mkdirSync(out,{recursive:true});
for(const entry of fs.readdirSync(root)){
 if(['understanding','europe','.nojekyll'].includes(entry)||/\.(html|css)$/.test(entry))fs.cpSync(path.join(root,entry),path.join(out,entry),{recursive:true});
}
const summary=fs.readFileSync(path.join(source,'SUMMARY.md'),'utf8');
const refs=[...summary.matchAll(/^\s*[*-]\s+\[([^\]]+)\]\(([^)]+\.md)\)/gm)];
if(!refs.length)throw Error('SUMMARY.md has no Markdown pages');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const pages=refs.map(([,label,file])=>{
 const absolute=path.resolve(source,file);
 if(!absolute.startsWith(source+path.sep))throw Error('Page outside source directory');
 const raw=fs.readFileSync(absolute,'utf8').replace(/^\uFEFF/,'').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'').trim();
 const title=raw.match(/^# (.+)/m)?.[1]||label;
 return {file,name:file.replace(/\.md$/,'.html'),raw,title,label};
});
const base=path.join(out,'understanding/europe');
const template=fs.readFileSync(path.join(root,'understanding/europe/index.html'),'utf8');
for(let i=0;i<pages.length;i++){
 const p=pages[i];let md=p.raw.replace(/\{% hint style="(.*?)" %\}/g,'<div class="hint">\n').replace(/\{% endhint %\}/g,'\n</div>');
 if(/\{%/.test(md))throw Error('Unsupported GitBook block in '+p.file+'; extend the renderer before publishing');
 let body=marked.parse(md);
 for(const q of pages)body=body.replaceAll('href="'+q.file+'"','href="'+q.name+'"').replaceAll('https://tour-1.gitbook.io/understanding-europe/'+q.file,q.name);
 body=body.replace(/(src|href)="(?![a-z]+:|\/|#)([^"?#]+)([^\"]*)"/gi,(all,attr,url,suffix)=>{
  if(pages.some(q=>q.name===url))return all;
  const absolute=path.resolve(source,url);if(!absolute.startsWith(source+path.sep)||!fs.existsSync(absolute))return all;
  return `${attr}="markdown/${url}${suffix}"`;
 });
 const nav=pages.map((q,j)=>`<a href="${q.name}" ${i===j?'aria-current="page"':''}>${esc(q.label)}</a>`).join('');
 const pager=`<div class="pager">${i?`<a href="${pages[i-1].name}">← ${esc(pages[i-1].title)}</a>`:'<span></span>'}${i<pages.length-1?`<a href="${pages[i+1].name}">${esc(pages[i+1].title)} →</a>`:''}</div>`;
 let html=template.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(p.title)} | Understanding Europe</title>`).replace(/<nav aria-label="Chapters">[\s\S]*?<\/nav>/,`<nav aria-label="Chapters">${nav}</nav>`).replace(/(<p class="eyebrow">[\s\S]*?<\/p>)[\s\S]*?<footer>/,`$1${body}${pager}<footer>`);
 fs.mkdirSync(path.dirname(path.join(base,p.name)),{recursive:true});fs.writeFileSync(path.join(base,p.name),html);
 if(i===0)fs.writeFileSync(path.join(base,'index.html'),html);
}
console.log(`Built ${pages.length} Europe chapters; preserved London and compatibility redirects.`);
