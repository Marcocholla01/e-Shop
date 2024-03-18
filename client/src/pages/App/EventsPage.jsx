import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import EventCard from "../../components/Route/Events/EventCard";
import { useSelector } from "react-redux";
import styles from "../../styles/style";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const CurrentlyDisplayedData = allEvents.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allEvents.length / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(endIndex, allEvents.length);

  return (
    <div>
      <Header activeHeading={4} />
      {/* Check if allEvents is available and not loading */}
      {!isLoading && CurrentlyDisplayedData && (
        <div className={`${styles.section} mb-10`}>
          {/* Map over allEvents array and render an EventCard for each event */}
          {CurrentlyDisplayedData.map((event, index) => (
            <div className={` mt-7 gap-3`}>
              <EventCard key={index} data={event} active={true} />
            </div>
          ))}
        </div>
      )}

      {CurrentlyDisplayedData && CurrentlyDisplayedData.length !== 0 ? (
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-center p-4  gap-4"
          aria-label="Table navigation"
        >
          <p className="flex items-center  justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300  dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 rounded-lg ">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              SHOWING{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {itemStartIndex}-{itemEndIndex}
              </span>{" "}
              OF{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {allEvents.length}
              </span>
            </span>
          </p>

          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-10">
            <li>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage == 1}
                className="flex items-center disabled:cursor-not-allowed justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            {
              // Array.from(iterable, mapFunction)
              Array.from({ length: totalPages }, (item, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={() => setCurrentPage(index + 1)}
                      // disabled={currentPage === index + 1}
                      className={
                        currentPage == index + 1
                          ? "flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-[#0EB981] border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-[#0eb981] dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                          : `flex items-center  justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white`
                      }
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              })
            }

            <li>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center disabled:cursor-not-allowed justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      ) : null}
      <Footer />
    </div>
  );
};

export default EventsPage;
