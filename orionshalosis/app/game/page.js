
export default function Page() {
    return (
        <div class="body">
            <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
            <p class="halosis" className="absolute top-5 w-full text-center z-10 text-2xl block text-white select-none">Welcome to Orion's Halosis!</p>
            <p class="waiting">Waiting for another player to join...</p>
            <p class="resource hidden" className="absolute left-4 bottom-4 w-full text-center z-10 text-xl block text-white select-none">Moon Stone : </p>
            <p class="resource2 hidden" className="absolute bottom-4 w-full text-center z-10 text-xl block text-white select-none">Moon Stone p2 : 0</p>
            <p class="timer hidden">Timer : 20</p>
            <canvas class="hidden"></canvas>
            <script src="./static/script.js" type="module"></script>
        </div>
    );
}

        // .timer{
        //     position: absolute;
        //     bottom: 15px;
        //     right: 15px;
        //     text-align: right;
        //     width: 100%;
        //     z-index: 100;
        //     font-size: 1.25rem;
        //     display:block;
        //     color: white;
        //     user-select: none
        // }
        // .hidden{
        //     display: none;
        // }
        // .waiting{
        //     position: absolute;
        //     top: 50%;
        //     width: 100%;
        //     text-align: center;
        //     z-index: 100;
        //     font-size: 1.5rem;
        //     display:block;
        //     color: white;
        //     user-select: none;
        // }
        // .body{
        //     background-color: black;
        // }