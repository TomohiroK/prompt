import { heroPhoto } from "@/lib/site";
import { Mascot } from "./Mascot";

/**
 * キービジュアルの人物。
 *
 * lib/site.ts の heroPhoto に写真を入れると写真に切り替わり、
 * null のあいだは自作のイラストが同じ位置・同じ比率で立つ。
 * 版面のほうを写真に合わせて作り直さずに済むよう、
 * 差し替え点をこの1ファイルに閉じ込めている。
 */
export function HeroFigure({ className = "" }: { className?: string }) {
  if (heroPhoto) {
    return (
      // 支給素材の寸法が事前に確定しないため next/image ではなく img を使う
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={heroPhoto.src}
        alt={heroPhoto.alt}
        className={`object-contain object-bottom ${className}`}
      />
    );
  }

  return <Mascot className={className} />;
}
