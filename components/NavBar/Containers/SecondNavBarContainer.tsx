interface NavBarContainerProps {
    children: React.ReactNode;
  }
  
  const SecondNavBarContainer: React.FC<NavBarContainerProps> = ({
    children
  }) => {
    return ( 
      <div className="bg-transparent w-full relative flex h-9 items-center justify-center text-center">
        {children}
      </div>
     );
  };
  
  export default SecondNavBarContainer;