const Footer = () => {
    return (
      <>
      {/* This footer will only render on screens smaller than 768px */}
      <footer className="bg-white border-t bottom-0 sticky inset-x-0 md:hidden grid grid-cols-4">
        <div className="mx-auto border py-10">
            COOOl
        </div>
        <div className="mx-auto border py-10">
            COOOl
        </div>
        <div className="mx-auto border py-10">
            COOOl
        </div>
        <div className="mx-auto border py-10">
            COOOl
        </div>
      </footer>
      {/* This footer will only render on screens larger than an iPad (larger than 768px) */}
      <footer className="hidden md:block bg-white border-t bottom-0 sticky inset-x-0 lg:relative">
        <div className="mx-auto py-10">
          <p className="text-center text-xs text-stone-600">
            &copy; 2024 Aviva, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
    )
  };
  
  export default Footer;