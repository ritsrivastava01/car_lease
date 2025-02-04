import LeaseForm from '@/components/ui/leaseForm';

export default function Home() {
  return (
    <div className="flex flex-col justify-center gap-4 pb-5 md:flex-row">
      <div className="w-full md:flex-1">
        <h2 className="pb-6 text-3xl text-slate-900">Get a free year of driving</h2>

        <p className="text-slate-600 first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 first-line:uppercase first-line:tracking-widest">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac neque
          est. Praesent condimentum libero ut bibendum pretium. Maecenas libero
          dolor, aliquam a ullamcorper vitae, sollicitudin et nunc. Fusce ac congue
          tellus. Sed eget vulputate turpis. Ut vitae pulvinar ipsum. Sed tempor
          porttitor augue eget placerat. Nullam at vulputate libero, eget interdum
          felis. Integer vitae ex eu dui pulvinar auctor. Suspendisse eu ex eget
          massa varius sollicitudin. Sed luctus ligula eu ante malesuada dapibus.
          Nulla tincidunt felis nec libero tristique congue. Integer tortor dolor,
          egestas non lacinia vel, scelerisque ac tortor.
        </p>
      </div>
      <div className="w-full md:flex-1">
        <LeaseForm />
      </div>
    </div>
  );
}
