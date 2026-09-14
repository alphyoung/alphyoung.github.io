const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');let errors=[],pages=0,links=0;
for(const book of ['europe','london']){
 const dir=path.join(root,'understanding',book);
 for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.html'))){
  pages++;const file=path.join(dir,f),s=fs.readFileSync(file,'utf8');
  if(!/<html lang="en"/i.test(s)||!/<h1[ >]/i.test(s))errors.push(f+': missing language/title');
  for(const m of s.matchAll(/(?:href|src)=["']([^"']+)["']/g)){
   const u=new URL(m[1],'https://alphyoung.github.io/understanding/'+book+'/'+f);
   if(u.origin!=='https://alphyoung.github.io')continue;
   links++;let p=decodeURIComponent(u.pathname);if(p.endsWith('/'))p+='index.html';
   const target=path.join(root,p);if(!fs.existsSync(target)){errors.push(f+': missing '+p);continue;}
   if(u.hash&&p.endsWith('.html')){const t=fs.readFileSync(target,'utf8');const id=decodeURIComponent(u.hash.slice(1));if(!t.includes('id="'+id+'"')&&!t.includes("id='"+id+"'"))errors.push(f+': missing anchor '+u.hash);}
  }
 }
}
console.log(JSON.stringify({pages,localLinks:links,errors},null,2));if(errors.length)process.exitCode=1;
