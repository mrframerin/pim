import { readFileSync } from "node:fs";
const html = readFileSync("public/notion-mirror/dev.html", "utf8");
const voids = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);
function findTagEnd(h,s){let q=null;for(let i=s;i<h.length;i++){const c=h[i];if(q){if(c===q)q=null;continue;}if(c==='"'||c==="'"){q=c;continue;}if(c===">")return i;}return -1;}
function sliceEl(h,start){const oe=findTagEnd(h,start);if(oe<0)return null;const open=h.slice(start,oe+1);const tm=/^<([a-zA-Z][\w:-]*)/.exec(open);if(!tm)return null;const tag=tm[1].toLowerCase();if(voids.has(tag)||open.endsWith("/>"))return{tag,open,end:oe+1,full:open};let depth=1,cur=oe+1;while(cur<h.length){const no=h.indexOf("<",cur);if(no<0)return null;if(h.startsWith("<!--",no)){const ce=h.indexOf("-->",no+4);cur=ce<0?h.length:ce+3;continue;}const ne=findTagEnd(h,no);if(ne<0)return null;const tok=h.slice(no,ne+1);if(new RegExp("^</"+tag+"\\s*>","i").test(tok)){depth--;if(depth===0)return{tag,open,end:ne+1,full:h.slice(start,ne+1)};}else if(new RegExp("^<"+tag+"(\\s|>|/)","i").test(tok)&&!tok.endsWith("/>"))depth++;cur=ne+1;}return null;}
function children(parentFull){const oe=findTagEnd(parentFull,0);const tagName=/^<([a-zA-Z][\w:-]*)/.exec(parentFull)[1];const inner=parentFull.slice(oe+1,parentFull.lastIndexOf("</"+tagName));const out=[];let cur=0;while(cur<inner.length){const n=inner.indexOf("<",cur);if(n<0)break;if(inner.startsWith("<!--",n)){const ce=inner.indexOf("-->",n+4);cur=ce<0?inner.length:ce+3;continue;}const el=sliceEl(inner,n);if(!el)break;out.push(el);cur=el.end;}return out;}
function walk(el, depth, idx){
  const cls=(/class="([^"]*)"/.exec(el.open)||[])[1]||"";const id=(/id="([^"]*)"/.exec(el.open)||[])[1]||"";
  console.log("  ".repeat(depth)+`<${el.tag}> id="${id}" class="${cls.slice(0,70)}"`);
  if(depth<2){children(el.full).forEach((c,i)=>walk(c,depth+1,i));}
}
const bs=html.indexOf("<body");const body=sliceEl(html,bs);
console.log("=== body direct children (2 levels) ===");
children(body.full).forEach((c,i)=>walk(c,0,i));
