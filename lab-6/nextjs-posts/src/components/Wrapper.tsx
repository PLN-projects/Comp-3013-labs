type ContainerProps = {
    chrildren: React.ReactNode;
}

//@ts-ignore
export default function Wrapper( {children} ) {
  return (
    <div className="max-w-[1100px] mx-auto bg-white min-h-screen flex flex-col border-l border-r text-center">
      {children}
    </div>
  )
}
