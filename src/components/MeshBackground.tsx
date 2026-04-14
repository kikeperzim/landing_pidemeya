import { useEffect, useState } from 'react';

export default function MeshBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none bg-white overflow-hidden">
      {/* 
        Subtle orange mesh/blobs inspired by the user reference.
        Using large, very soft radial gradients to create an atmospheric feel.
      */}
      
      {/* Top Left Glow */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#FB650A]/10 blur-[140px] rounded-full animate-blob" 
        style={{ animationDelay: '0s' }}
      ></div>
      
      {/* Bottom Right Glow */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#FB650A]/8 blur-[120px] rounded-full animate-blob" 
        style={{ animationDelay: '2s' }}
      ></div>
      
      {/* Center Right Accent */}
      <div 
        className="absolute top-[20%] right-[0%] w-[40%] h-[40%] bg-[#FB650A]/5 blur-[100px] rounded-full animate-blob" 
        style={{ animationDelay: '4s' }}
      ></div>

      {/* Very subtle grain/noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}
