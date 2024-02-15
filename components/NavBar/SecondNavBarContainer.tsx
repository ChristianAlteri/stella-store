interface NavBarContainerProps {
    children: React.ReactNode;
  }
  
  const SecondNavBarContainer: React.FC<NavBarContainerProps> = ({
    children
  }) => {
    return ( 
      <div className="bg-secondary gap-4 w-full mx-auto relative px-4 sm:px-6 lg:px-8 flex h-9 items-center">
        {children}
      </div>
     );
  };
  
  export default SecondNavBarContainer;