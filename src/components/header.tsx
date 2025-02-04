import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Header = ({ className }: { className: string }) => {
  return (
    <div className={cn('flex justify-center md:justify-start', className)}>
      <Image src="/logo.png" alt="logo" height={200} width={250} />
    </div>
  );
};
export default Header;
