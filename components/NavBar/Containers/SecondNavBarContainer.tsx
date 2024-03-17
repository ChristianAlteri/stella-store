interface NavBarContainerProps {
    children: React.ReactNode;
  }
  
  const SecondNavBarContainer: React.FC<NavBarContainerProps> = ({
    children
  }) => {
    return ( 
      // <div className="bg-transparent w-full relative flex h-9 items-center justify-center text-center">
      <div className="bg-transparent justify-between w-full mx-auto p-1 flex h-16 items-center sticky z-50">
        {children}
      </div>
     );
  };
  
  export default SecondNavBarContainer;