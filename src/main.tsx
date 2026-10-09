import React,{useEffect,useRef,useState} from 'react';
import{createRoot}from'react-dom/client';
import gsap from'gsap';
import{ScrollTrigger}from'gsap/ScrollTrigger';
import{ArrowUpRight,ArrowDown,ArrowLeft,ArrowRight,Menu,X}from'lucide-react';
import './style.css';
gsap.registerPlugin(ScrollTrigger);
const base='https://www.ramsetuconstructions.com/assets/images/';
const images=['img-7888-1170x752.png','img-1233-1170x1052-800x719.png','0f152acd-3ecb-4186-b26a-2e9536241a80-1334x1000-800x600.jpg','img-171-2000x1125-800x450.jpg','img-1407-2000x1125-800x450.jpg','23dc8a57-f7b1-4e59-bc68-e8fe20f85c74-1120x1280-800x914.jpg','2a1a035e-00d3-4073-ac80-cdf3d0b51dd7-1280x885-800x553.jpg'].map(x=>base+x);
const wa='https://wa.me/918088884893?text='+encodeURIComponent('Hello Ramsetu Constructions, I would like to discuss a project.');
const moments=[{number:'01',eyebrow:'FORM',title:'A vision of what could be.',body:'Every project begins as a possibility. Shape, scale and the feeling of a place.',image:images[0]},{number:'02',eyebrow:'MATERIAL',title:'A language of detail.',body:'Materials, light and proportion turn a structure into an experience.',image:images[2]},{number:'03',eyebrow:'SPACE',title:'Made for living.',body:'A considered space is about more than what you see. It is how you feel inside it.',image:images[1]}];
const gallery=[{label:'Architecture / Study 01',image:images[0]},{label:'Residential design / Study 02',image:images[3]},{label:'Materials and space / Study 03',image:images[2]},{label:'Built environment / Study 04',image:images[4]}];
function SpatialStory(){
 const pin=useRef<HTMLElement>(null);
 const [active,setActive]=useState(0);
 useEffect(()=>{
  if(!pin.current)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){setActive(2);return;}
  const ctx=gsap.context(()=>{
   gsap.set('.scene-image',{clipPath:'inset(0 0 0 100%)',scale:1.18});
   gsap.set('.scene-image:first-child',{clipPath:'inset(0 0 0 0)',scale:1});
   const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:pin.current,start:'top top',end:'+=230%',pin:true,scrub:1,anticipatePin:1,invalidateOnRefresh:true,onUpdate:self=>{const n=Math.min(2,Math.floor(self.progress*3));setActive(prev=>prev===n?prev:n)}}});
   tl.to('.scene-image:nth-child(2)',{clipPath:'inset(0 0 0 0)',scale:1,duration:1},0.5)
     .to('.scene-image:first-child',{scale:1.15,duration:1},0.5)
     .to('.scene-image:nth-child(3)',{clipPath:'inset(0 0 0 0)',scale:1,duration:1},1.6)
     .to('.scene-image:nth-child(2)',{scale:1.15,duration:1},1.6);
  },pin);return()=>ctx.revert();
 },[]);
 return <section className="spatial" ref={pin} id="approach" aria-label="Spatial journey through architectural work">
  <div className="spatial-images">{moments.map((m,i)=><div className="scene-image" key={m.number}><img src={m.image} alt={'Ramsetu published gallery, architectural visual '+m.number} loading={i===0?'eager':'lazy'}/></div>)}</div>
  <div className="spatial-scrim"/>
  <div className="spatial-top"><span>CHAPTER 01 / THE EXPERIENCE OF SPACE</span><span>RAMSETU CONSTRUCTIONS</span></div>
  <div className="spatial-copy" key={active}><div className="scene-small">{moments[active].number} / 03 — {moments[active].eyebrow}</div><h2>{moments[active].title}</h2><p>{moments[active].body}</p></div>
  <div className="spatial-rail">{moments.map((m,i)=><div key={m.number} className={i===active?'selected':''}><span>{m.number}</span><span>{m.eyebrow}</span></div>)}</div>
  <div className="spatial-bottom"><span>THREE VISUAL STUDIES / FROM RAMSETU'S PUBLISHED GALLERY</span><span>CONTINUE SCROLLING ↓</span></div>
 </section>
}
function App(){
 const root=useRef<HTMLDivElement>(null);
 const [menu,setMenu]=useState(false);
 const [selected,setSelected]=useState(0);
 const [progress,setProgress]=useState(0);
 useEffect(()=>{
  const ctx=gsap.context(()=>{
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   gsap.fromTo('.hero-image img',{scale:1.13},{scale:1,duration:2,ease:'power2.out'});
   gsap.from('.hero-reveal',{y:70,opacity:0,duration:1.25,stagger:.11,ease:'power3.out',delay:.18});
   gsap.utils.toArray<HTMLElement>('.enter').forEach(el=>gsap.from(el,{y:55,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
   ScrollTrigger.create({onUpdate:()=>setProgress(Math.max(0,Math.min(100,Math.round(window.scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100))))});
  },root);return()=>ctx.revert();
 },[]);
 const shift=(n:number)=>setSelected(i=>(i+n+gallery.length)%gallery.length);
 return <div className="site" ref={root}>
  <div className="concept-strip">INDEPENDENT DESIGN CONCEPT FOR RAMSETU — NOT THE OFFICIAL WEBSITE</div>
  <header className="navigation">
   <a href="#top" className="wordmark" aria-label="Ramsetu home"><img src="/ramsetu-original-logo.png" alt="Ramsetu original logo"/><span>RAMSETU<small>CONSTRUCTIONS</small></span></a>
   <nav className="desktop-nav"><a href="#approach">The Experience</a><a href="#projects">Work</a><a href="#expertise">Practice</a></nav>
   <a className="nav-action" href={wa} target="_blank" rel="noreferrer">DISCUSS A PROJECT <ArrowUpRight size={17}/></a>
   <button className="mobile-toggle" onClick={()=>setMenu(!menu)} aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button>
  </header>
  {menu&&<div className="mobile-menu">{[['The Experience','approach'],['Selected Work','projects'],['Our Practice','expertise'],['Enquire','contact']].map(([label,id],i)=><a key={id} href={'#'+id} onClick={()=>setMenu(false)}><small>0{i+1}</small>{label}<ArrowUpRight/></a>)}</div>}
  <main>
   <section className="hero" id="top">
    <div className="hero-image"><img src={images[0]} alt="Architectural image from Ramsetu Constructions' published gallery" fetchPriority="high"/></div>
    <div className="hero-shade"/>
    <div className="hero-top"><span>ARCHITECTURE / CONSTRUCTION / INTERIORS</span><span>BENGALURU · MYSURU · HASSAN</span></div>
    <div className="hero-heading"><span className="hero-index hero-reveal">AN ARCHITECTURAL PRACTICE / PRESENTED DIFFERENTLY</span><h1 className="hero-reveal">Spaces worth<br/><em>belonging to.</em></h1><div className="hero-line hero-reveal"><span>RAMSETU</span><span>EST. IN PURPOSE</span></div></div>
    <div className="hero-bottom"><p className="hero-reveal">A new perspective on the places we imagine, shape and build.</p><a className="hero-scroll" href="#approach">ENTER THE EXPERIENCE <ArrowDown size={17}/></a><span>01 — 05</span></div>
   </section>
   <SpatialStory/>
   <section className="statement" id="expertise"><div className="statement-head enter"><span>02 / THE PRACTICE</span><span>THOUGHT THROUGH. BUILT WITH CARE.</span></div><div className="statement-main enter"><h2>Buildings are made.<br/><em>Places are felt.</em></h2><p>Architecture, construction and interiors aren't separate conversations. Together, they shape how a place looks, works and feels.</p></div><div className="disciplines enter">{[['01','ARCHITECTURE'],['02','CONSTRUCTION'],['03','INTERIORS']].map(([n,t])=><div key={n}><small>{n}</small><span>{t}</span><ArrowUpRight size={20}/></div>)}</div></section>
   <section className="work" id="projects"><div className="work-head enter"><span>03 / SELECTED VISUAL STUDIES</span><h2>Work that speaks<br/><em>in spaces.</em></h2><p>Published imagery from Ramsetu's gallery, arranged as an independent editorial study. Individual project names and completion status have not been verified.</p></div><div className="work-stage"><div className="work-image" key={selected}><img src={gallery[selected].image} alt={gallery[selected].label+' from Ramsetu gallery'}/></div><div className="work-count">{String(selected+1).padStart(2,'0')} <span>/ 04</span></div><div className="work-caption"><div><span>RAMSETU / PUBLISHED WORK</span><h3>{gallery[selected].label}</h3></div><div className="work-arrows"><button onClick={()=>shift(-1)} aria-label="Previous image"><ArrowLeft/></button><button onClick={()=>shift(1)} aria-label="Next image"><ArrowRight/></button></div></div></div></section>
   <section className="interlude"><div className="interlude-image"><img src={images[6]} alt="Architectural detail from Ramsetu's gallery" loading="lazy"/></div><div className="interlude-copy enter"><span>04 / THE DETAILS</span><h2>The difference<br/>is in what you<br/><em>notice.</em></h2></div></section>
   <section className="contact" id="contact"><div className="contact-overline">05 / THE NEXT BEGINNING</div><div className="contact-main enter"><h2>Have a space<br/><em>in mind?</em></h2><a href={wa} target="_blank" rel="noreferrer">LET'S TALK ABOUT IT <ArrowUpRight size={25}/></a></div><footer><div className="footer-logo"><img src="/ramsetu-original-logo.png" alt="Original Ramsetu logo"/><span>RAMSETU <small>CONSTRUCTIONS</small></span></div><span>INDEPENDENT PITCH CONCEPT · 2026</span><a href="https://instagram.com/ramsetu_constructions/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href="#top">BACK TO TOP ↑</a></footer></section>
  </main><div className="progress-line" style={{transform:'scaleX('+progress/100+')'}}/>
 </div>
}
createRoot(document.getElementById('root')!).render(<App/>);
