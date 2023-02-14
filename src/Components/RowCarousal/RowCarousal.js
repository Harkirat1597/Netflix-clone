import React, { useEffect, useState, useMemo } from 'react';
import './RowCarousal.css';
import axios from '../../API_Configurations/axios';
import Movie from '../Movie';

const RowCarousal = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        document.addEventListener("click", (e) => {
            let handle;
            if (e.target.matches(".handle")) handle = e.target;
            else handle = e.target.closest(".handle");
            if (!handle) return;
            onHandleClick(handle);
        });

        function onHandleClick(handle) {
            document
            .querySelectorAll(".row-progress-bar")
            .forEach((el) => calcProgressItems(el));

            const progressBar = handle.closest(".row-carousal").querySelector(".row-progress-bar");
            const slider = handle.closest(".row-container").querySelector(".slider");
            const sliderIdx = parseInt(
                getComputedStyle(slider).getPropertyValue("--slider-index")
            );
            const progressBarItemsCount = progressBar.children.length;
            if (handle.classList.contains("handle-left")) {
                // For left click
                if (sliderIdx - 1 < 0) {
                    slider.style.setProperty("--slider-index", progressBarItemsCount - 1);
                    progressBar.children[sliderIdx].classList.remove("active");
                    progressBar.children[progressBarItemsCount - 1].classList.add("active");
                } else {
                    slider.style.setProperty("--slider-index", sliderIdx - 1);
                    progressBar.children[sliderIdx].classList.remove("active");
                    progressBar.children[progressBarItemsCount - 1].classList.add("active");
                }
            } else if (handle.classList.contains("handle-right")) {
                // For right click
                if (sliderIdx + 1 >= progressBarItemsCount) {
                    slider.style.setProperty("--slider-index", 0);
                    progressBar.children[sliderIdx].classList.remove("active");
                    progressBar.children[0].classList.add("active");
                } else {
                    slider.style.setProperty("--slider-index", sliderIdx + 1);
                    progressBar.children[sliderIdx].classList.remove("active");
                    progressBar.children[sliderIdx + 1].classList.add("active");
                }
            }
        }

        window.addEventListener("resize", (e) => {
            // Recalculating progess bar
            document
                .querySelectorAll(".row-progress-bar")
                .forEach((el) => calcProgressItems(el));
        });


        function calcProgressItems(progressBar) {
            progressBar.innerHTML = "";
            const slider = progressBar.closest(".row-carousal").querySelector(".slider");
            const itemCount = slider.children.length;
            // console.log(itemCount);
            const itemsPerScreen = parseInt(
                getComputedStyle(slider).getPropertyValue("--items-per-screen")
            );
            // console.log(itemsPerScreen);

            const progressBarItems = Math.ceil(itemCount / itemsPerScreen);
            const sliderIdx = parseInt(
                getComputedStyle(slider).getPropertyValue("--slider-index")
            );
            for (let i = 0; i < progressBarItems; i++) {
                const barItem = document.createElement("div");
                barItem.classList.add("row-progress-item");
                if (i === sliderIdx) barItem.classList.add("active");
                progressBar.append(barItem);
            }
        }

        // window.addEventListener("resize", (e) => {
        //     console.log(window.innerWidth);
        // })

        return () => {
            document.removeEventListener("click", (e) => { });
            window.removeEventListener("resize", (e) => { });
            // window.removeEventListener("resize", (e) => { });
        }
    }, []);
    
    useEffect(() => {
        fetchData();
    }, [fetchUrl]);
    
    const fetchData = async () => {
        const res = await axios.get(fetchUrl);
        setMovies(res.data.results);
        return;
    };

    return (
        <div className='row-carousal'>
            <div class="row-header">
                <h3 class="row-title"> {title} </h3>
                <div class="row-progress-bar row-show-hidden">
                    <div class="row-progress-item"></div>
                    <div class="row-progress-item active"></div>
                    <div class="row-progress-item"></div>
                    <div class="row-progress-item"></div>
                </div>
            </div>
            <div class="row-container">
                <button class="handle handle-left row-show-hidden">
                    <div>&#8249;</div>
                </button>

                <div class="slider">
                    {movies.map((movie) => {
                        return <Movie movie={movie} isLargeRow={isLargeRow} />
                    })}
                </div>

                <button class="handle handle-right row-show-hidden">
                    <div>&#8250;</div>
                </button>
            </div>
        </div>
    )
}

export default RowCarousal;