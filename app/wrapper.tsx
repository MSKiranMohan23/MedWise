import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Wrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="h-[85vh]" data-testid="wrapper">
        <Header />
        <main className="grid grid-col-1 row-start-2 h-[82vh]">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Wrapper;
