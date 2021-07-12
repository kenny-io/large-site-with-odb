import styles from "../styles/Home.module.css";
export default function Footer() {
  return (
    <footer className="footer bg-white relative pt-1 border-b-2 border-green-900">
      <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
            <p className="text-sm text-green-900 font-medium mb-2">
              © 2021 kenny.io
            </p>
          </div>
        </div>
      </div>
    </footer>
    // <footer className={styles.footer}>
    //   <a
    //     href="https://twitter.com/kenny_io/"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     Built with 💚 by Ekene Eze{" "}
    //   </a>
    // </footer>
  );
}
