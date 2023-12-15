"use client";
import MyThree from './static/script.js';

export default function Page() {
    return (
        <div className='w-full'>
            {/* <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script> */}
            <p className="halosis absolute top-5 w-full text-center z-10 text-2xl block text-white select-none">Welcome to Orion's Halosis!</p>
            <p className="waiting absolute top-1/2 w-full text-center z-10 text-xl select-none">Waiting for another player to join...</p>
            <p className="resource hidden absolute left-4 bottom-4 w-full text-center z-10 text-xl text-white select-none">Moon Stone : </p>
            <p className="resource2 hidden absolute bottom-4 w-full text-center z-10 text-xl text-white select-none">Moon Stone p2 : 0</p>
            <p className="timer hidden absolute bottom-4 right-4 z-10 text-white select-none">Timer : 20</p>
            <MyThree />
        </div>
    );
}