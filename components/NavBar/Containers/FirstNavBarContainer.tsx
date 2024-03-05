interface NavBarContainerProps {
    children: React.ReactNode;
  }
  
  const FirstNavBarContainer: React.FC<NavBarContainerProps> = ({
    children
  }) => {
    return ( 
      <div className="bg-transparent justify-between w-full mx-auto relative p-1 flex h-16 items-center">
        {children}
      </div>
     );
  };
  
  export default FirstNavBarContainer;