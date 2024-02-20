interface NavBarContainerProps {
    children: React.ReactNode;
  }
  
  const FirstNavBarContainer: React.FC<NavBarContainerProps> = ({
    children
  }) => {
    return ( 
      <div className="bg-transparent justify-between w-full mx-auto relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        {children}
      </div>
     );
  };
  
  export default FirstNavBarContainer;