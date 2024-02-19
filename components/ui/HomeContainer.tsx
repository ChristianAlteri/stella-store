interface HomeContainerProps {
    children: React.ReactNode;
  }
  
  const HomeContainer: React.FC<HomeContainerProps> = ({
    children
  }) => {
    return ( 
        <div className="flex flex-col items-center w-full">
        {children}
      </div>
     );
  };
  
  export default HomeContainer;