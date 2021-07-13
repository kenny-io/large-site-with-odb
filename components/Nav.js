import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <div className="relative bg-white">
      <div className=" mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">Workflow</span>
                <Image
                  className="h-8 w-auto sm:h-10"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvcScFQoVMwuFx_3cSqJ_l5QC1FE9EpkLo6g&usqp=CAU"
                  alt="logo"
                  height="40px"
                  width="50px"
                />
              </a>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link href="/shop">
              <a className="text-base font-medium text-gray-500 hover:text-gray-100">
                Shop
              </a>
            </Link>

            <Link href="/about">
              <a className="text-base font-medium text-gray-500 hover:text-gray-100">
                About
              </a>
            </Link>

            <Link href="/docs">
              <a className="text-base font-medium text-gray-500 hover:text-gray-100">
                Docs
              </a>
            </Link>

            <Link href="/blog">
              <a className="text-base font-medium text-gray-500 hover:text-gray-100">
                Blog
              </a>
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link href="/">
              <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-100">
                Sign in
              </a>
            </Link>
            <Link href="/">
              <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-900 hover:bg-red-100">
                Sign up
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
