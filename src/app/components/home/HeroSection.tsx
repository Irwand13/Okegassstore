import { useEffect, useRef, useState } from "react";

const LOGO = "https://i.pinimg.com/736x/ad/14/4a/ad144a58f41774b689ee453ed420ca77.jpg";
const GAMES = ["Mobile Legends","Free Fire","PUBG Mobile","Valorant","Genshin Impact","COD Mobile","Honkai: SR","Clash of Clans","Roblox","Fortnite"];
const FEATURES = ["100% AMAN","24/7 LAYANAN","HARGA TERBAIK","TERPERCAYA","AUTO PROCESS","TOP UP CEPAT","NO. 1 INDONESIA","PROSES INSTAN"];

/* ── Ember Particles ── */
function Embers() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let raf;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 45 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 1000 + 300,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.6 + 0.15),
      life: Math.random(),
      col: Math.random() > 0.5 ? "255,55,20" : "255,130,15",
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.0035;
        if (p.life <= 0 || p.y < -10) {
          p.x = Math.random() * c.width; p.y = c.height + 5;
          p.life = 0.6 + Math.random() * 0.4;
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},${(p.life * 0.7).toFixed(2)})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0 }} />;
}

/* ── Animated Number ── */
function Num({ n, suf = "" }) {
  const [v, setV] = useState(0);
  const r = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let cur = 0; const step = n / 50;
      const id = setInterval(() => {
        cur += step;
        if (cur >= n) { setV(n); clearInterval(id); } else setV(Math.floor(cur));
      }, 18);
      io.disconnect();
    }, { threshold: 0.4 });
    if (r.current) io.observe(r.current);
    return () => io.disconnect();
  }, [n]);
  return <span ref={r}>{v.toLocaleString()}{suf}</span>;
}

/* ── Logo with cursor tilt + shimmer ── */
function LogoCard({ on }) {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const shimRef = useRef(null);
  const mouse  = useRef({ x: 0.5, y: 0.5 });
  const cur    = useRef({ rx: 0, ry: 0, sx: 50, sy: 50, glow: 0 });
  const rafId  = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // normalized 0-1 relative to the card
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top)  / rect.height;
    };
    window.addEventListener("mousemove", onMove);

    const MAX_TILT = 18; // degrees

    const tick = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // target rotation
      const targetRX = -(my - 0.5) * MAX_TILT * 2;
      const targetRY =  (mx - 0.5) * MAX_TILT * 2;

      // shimmer position follows cursor
      const targetSX = mx * 100;
      const targetSY = my * 100;

      // glow intensity near center of card (max at edges)
      const dist = Math.sqrt((mx - 0.5) ** 2 + (my - 0.5) ** 2);
      const targetGlow = Math.min(dist * 2, 1);

      // lerp
      const k = 0.08;
      cur.current.rx += (targetRX - cur.current.rx) * k;
      cur.current.ry += (targetRY - cur.current.ry) * k;
      cur.current.sx += (targetSX - cur.current.sx) * k;
      cur.current.sy += (targetSY - cur.current.sy) * k;
      cur.current.glow += (targetGlow - cur.current.glow) * k;

      const card = cardRef.current;
      const shim = shimRef.current;
      if (card) {
        card.style.transform = `perspective(700px) rotateX(${cur.current.rx.toFixed(2)}deg) rotateY(${cur.current.ry.toFixed(2)}deg) scale3d(1.03,1.03,1.03)`;
      }
      if (shim) {
        const g = cur.current.glow;
        shim.style.background = `
          radial-gradient(
            circle at ${cur.current.sx.toFixed(1)}% ${cur.current.sy.toFixed(1)}%,
            rgba(255,255,255,${(0.18 + g * 0.12).toFixed(2)}) 0%,
            rgba(255,200,120,${(0.10 + g * 0.06).toFixed(2)}) 30%,
            transparent 65%
          ),
          linear-gradient(
            ${(cur.current.ry * 3).toFixed(0)}deg,
            rgba(255,80,20,${(0.06 + g * 0.04).toFixed(2)}) 0%,
            transparent 50%,
            rgba(200,40,10,${(0.04 + g * 0.03).toFixed(2)}) 100%
          )
        `;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* outer ring — pure CSS, no tilt */}
      <div style={{
        position: "absolute",
        width: "clamp(280px,38vw,430px)",
        height: "clamp(280px,38vw,430px)",
        borderRadius: "50%",
        border: "1px solid rgba(220,40,10,.16)",
        borderTopColor: "rgba(220,40,10,.04)",
        borderBottomColor: "rgba(220,40,10,.04)",
        animation: "rspin 20s linear infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        width: "clamp(220px,30vw,340px)",
        height: "clamp(220px,30vw,340px)",
        borderRadius: "50%",
        border: "1px solid rgba(255,100,0,.1)",
        borderLeftColor: "rgba(255,100,0,.03)",
        borderRightColor: "rgba(255,100,0,.03)",
        animation: "rspin 28s linear infinite reverse",
        pointerEvents: "none",
      }} />

      {/* tilt card */}
      <div
        ref={cardRef}
        style={{
          position: "relative",
          width: "clamp(200px,26vw,280px)",
          height: "clamp(200px,26vw,280px)",
          borderRadius: "50%",
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "box-shadow .3s",
          boxShadow: `
            0 0 0 2.5px rgba(220,40,10,.38),
            0 0 0 10px rgba(220,40,10,.06),
            0 0 50px rgba(220,40,10,.25),
            0 0 100px rgba(220,40,10,.10),
            0 24px 48px rgba(0,0,0,.7)
          `,
          animation: on ? "lf 5s ease-in-out infinite" : "none",
          overflow: "hidden",
        }}
      >
        {/* actual logo image */}
        <img
          src={LOGO}
          alt="OkeGas Wolf"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            borderRadius: "50%",
            filter: "saturate(1.12) contrast(1.06)",
            userSelect: "none", pointerEvents: "none",
          }}
        />

        {/* shimmer layer — cursor-reactive */}
        <div
          ref={shimRef}
          style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            pointerEvents: "none",
            mixBlendMode: "screen",
            transition: "background .05s",
          }}
        />

        {/* static vignette */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "radial-gradient(circle at 50% 110%, rgba(0,0,0,.3) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

export default function App() {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 80); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #060610; overflow-x: hidden; }

        @keyframes rspin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes lf    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes mq    { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ── HERO ── */
        .H {
          position: relative; min-height: 100vh;
          background: #060610; overflow: hidden;
          font-family: 'Barlow Condensed', sans-serif; color: #fff;
          display: flex; flex-direction: column;
        }
        .H::before {
          content:''; position:absolute; inset:0; z-index:0; pointer-events:none;
          background-image: repeating-linear-gradient(58deg,transparent 0 50px,rgba(220,40,10,.02) 50px 51px);
        }
        .orb { position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none; z-index:0; }
        .orb-r { width:520px;height:520px;top:-80px;right:-80px;background:rgba(200,20,0,.06); }
        .orb-o { width:400px;height:400px;bottom:-60px;left:-60px;background:rgba(255,80,0,.05); }

        /* ── GRID ── */
        .G {
          position:relative; z-index:1; flex:1;
          display:grid; grid-template-columns:1fr 480px; gap:0;
          max-width:1340px; width:100%; margin:0 auto;
          padding:0 64px; align-items:center;
          min-height:100vh;
        }
        @media(max-width:1100px){ .G{ grid-template-columns:1fr 400px; padding:0 40px; } }
        @media(max-width:900px){
          .G{ grid-template-columns:1fr; padding:48px 24px 52px; min-height:unset; gap:40px; }
        }

        /* ── LEFT ── */
        .L { display:flex; flex-direction:column; gap:22px; padding:64px 0; }
        @media(max-width:900px){ .L{ padding:0; order:2; } }

        .rv { opacity:0; transform:translateY(18px); transition:opacity .7s,transform .7s; }
        .rv.on { opacity:1; transform:translateY(0); }

        .pill {
          display:inline-flex; align-items:center; gap:8px;
          padding:6px 16px; border-radius:100px; width:fit-content;
          border:1px solid rgba(220,40,10,.32); background:rgba(220,40,10,.09);
          font-size:.78rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#ff7050;
        }
        .dot { width:7px;height:7px;border-radius:50%;background:#ff4422;animation:blink 1.8s infinite; }

        .headline {
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(3.2rem,5.5vw,6rem);
          line-height:.92; letter-spacing:.02em;
        }
        .headline .w { color:#f0f0f0; display:block; }
        .headline .g {
          display:block;
          background:linear-gradient(130deg,#ff2a00,#ff9800);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }
        .headline .sm { display:block; color:#f0f0f0; font-size:clamp(1.3rem,2.1vw,2.1rem); margin-top:.1em; }

        .rule { display:flex; align-items:center; gap:8px; }
        .rule-a { height:3px;width:56px;border-radius:2px;background:linear-gradient(90deg,#c51000,#ff4000); }
        .rule-b { height:3px;width:18px;border-radius:2px;background:rgba(197,16,0,.35); }

        .desc { color:rgba(205,205,225,.7); font-size:clamp(.9rem,1.5vw,1.05rem); line-height:1.7; max-width:460px; }

        .btns { display:flex; flex-wrap:wrap; gap:12px; }
        @media(max-width:480px){ .btns{ flex-direction:column; } }

        .bp {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 30px; border-radius:8px;
          background:linear-gradient(135deg,#c51000,#ff4000);
          color:#fff; border:none; cursor:pointer; text-decoration:none;
          font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:.12em;
          position:relative; overflow:hidden;
          transition:transform .15s,box-shadow .15s;
        }
        .bp::after {
          content:''; position:absolute; top:0; left:-60%; width:40%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
          transform:skewX(-18deg); transition:left .45s;
        }
        .bp:hover { transform:scale(1.04); box-shadow:0 0 28px rgba(197,16,0,.5),0 6px 20px rgba(0,0,0,.4); }
        .bp:hover::after { left:130%; }

        .bo {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 30px; border-radius:8px;
          background:transparent; color:rgba(255,255,255,.78);
          border:1px solid rgba(255,255,255,.18); cursor:pointer; text-decoration:none;
          font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:.12em;
          transition:border-color .2s,color .2s,background .2s;
        }
        .bo:hover { border-color:#c51000; color:#fff; background:rgba(197,16,0,.1); }

        /* stats */
        .stats { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid rgba(255,255,255,.07); padding-top:20px; }
        .stat { display:flex; flex-direction:column; align-items:center; text-align:center; }
        .stat+.stat { border-left:1px solid rgba(255,255,255,.07); }
        .sv {
          font-family:'Bebas Neue',sans-serif; font-size:clamp(1.8rem,3vw,2.6rem); line-height:1;
          background:linear-gradient(135deg,#ff5533,#ff9900);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }
        .sl { font-size:.72rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:rgba(150,150,170,.65); margin-top:5px; }

        /* badges */
        .badges { display:flex; flex-wrap:wrap; gap:7px; }
        .badge {
          padding:4px 11px; border-radius:4px;
          border:1px solid rgba(200,40,10,.2); background:rgba(200,40,10,.06);
          font-size:.7rem; font-weight:700; letter-spacing:.07em; color:rgba(220,110,90,.8);
          cursor:default; transition:border-color .2s,color .2s;
        }
        .badge:hover { border-color:rgba(200,40,10,.45); color:#ff7755; }

        /* ── RIGHT ── */
        .R {
          position:relative; display:flex; align-items:center; justify-content:center;
          height:100%; padding:64px 0 64px 24px;
        }
        @media(max-width:900px){ .R{ order:1; padding:0; height:clamp(300px,72vw,400px); } }

        /* ── MARQUEES ── */
        .MQ {
          position:relative; z-index:1;
          border-top:1px solid rgba(255,255,255,.04);
          background:rgba(8,8,18,.8); overflow:hidden;
        }
        .mq-row { padding:10px 0; display:flex; overflow:hidden; }
        .mq-row+.mq-row { border-top:1px solid rgba(255,255,255,.03); }
        .mq-track { display:flex; gap:40px; width:max-content; animation:mq 22s linear infinite; }
        .mq-track.rev { animation-direction:reverse; }
        .mq-item {
          display:flex; align-items:center; gap:9px;
          font-size:.75rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
          color:rgba(170,100,80,.65); white-space:nowrap;
          font-family:'Barlow Condensed',sans-serif; cursor:default; transition:color .2s;
        }
        .mq-item:hover { color:#ff5533; }
        .mq-dot { width:4px;height:4px;border-radius:50%;background:rgba(200,40,10,.45);flex-shrink:0; }
      `}</style>

      {/* ── HERO ── */}
      <section className="H">
        <Embers />
        <div className="orb orb-r" />
        <div className="orb orb-o" />

        <div className="G">
          {/* LEFT */}
          <div className="L">
            <div className={`pill rv ${on?"on":""}`} style={{transitionDelay:".05s"}}>
              <span className="dot" /> Dipercaya 19 Juta+ Gamer Indonesia
            </div>

            <h1 className={`headline rv ${on?"on":""}`} style={{transitionDelay:".18s"}}>
              <span className="w">TOP UP GAME</span>
              <span className="g">TERMURAH!</span>
              <span className="sm">INSTAN &amp; TERPERCAYA</span>
            </h1>

            <div className={`rule rv ${on?"on":""}`} style={{transitionDelay:".3s"}}>
              <div className="rule-a"/><div className="rule-b"/>
            </div>

            <p className={`desc rv ${on?"on":""}`} style={{transitionDelay:".4s"}}>
              Platform top up &amp; jual beli akun game terpercaya di Indonesia.
              Transaksi otomatis, aman, dan harga paling predator.
            </p>

            <div className={`btns rv ${on?"on":""}`} style={{transitionDelay:".52s"}}>
              <a href="#" className="bp">⚡ TOP UP SEKARANG →</a>
              <a href="#" className="bo">🎮 JUAL BELI AKUN</a>
            </div>

            <div className={`stats rv ${on?"on":""}`} style={{transitionDelay:".64s"}}>
              {[{n:19,s:"JT+",l:"Transaksi"},{n:3000,s:"+",l:"User Aktif"},{n:1,s:" MIN",l:"Proses"}].map(({n,s,l})=>(
                <div className="stat" key={l}>
                  <div className="sv"><Num n={n} suf={s}/></div>
                  <div className="sl">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — single logo only */}
          <div className="R" style={{
            opacity: on ? 1 : 0,
            transform: on ? "none" : "translateX(32px)",
            transition: "opacity .9s .25s, transform .9s .25s",
          }}>
            <LogoCard on={on} />
          </div>
        </div>
      </section>
    </>
  );
}