// Function to dynamically load the YouTube IFrame API script
function loadYouTubeAPI(callback) {
    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.onload = callback;
        document.body.appendChild(script);
    } else if (callback) {
        callback();
    }
}

let player;

// Function to initialize the YouTube player
function initializePlayer(videoId) {
    console.log(`Initializing player with video ID: ${videoId}`);
    const videoContainer = document.querySelector('.popup_modal .video-container');

    // Clean up existing player if any
    if (player) {
        player.destroy();
        player = null;
    }

    // Clear the video container
    videoContainer.innerHTML = '';

    // Create a new player
    player = new YT.Player(videoContainer, {
        height: '390',
        width: '640',
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError // Add error handling
        }
    });
}

// Function to handle player ready event
function onPlayerReady(event) {
    console.log('Player ready');
    // Play video when ready
    setTimeout(() => event.target.playVideo(), 100);
}

// Function to handle player error
function onPlayerError(event) {
    console.error('Error occurred: ', event.data);
}

// Function to show the modal
function showModal(videoId) {
    if (document.querySelector('.popup_modal')) {
        initializePlayer(videoId);
        document.querySelector('.popup_modal').classList.add('show-modal');
        document.documentElement.classList.add('no-scroll');
    }
}

// Function to close the modal
function closeModal() {
    if (player) {
        player.stopVideo(); // Use stopVideo to ensure the video is fully stopped
        player.destroy();  // Ensure the player is destroyed
        player = null;
    }
    const modal = document.querySelector('.popup_modal');
    if (modal) {
        modal.classList.remove('show-modal');
        document.documentElement.classList.remove('no-scroll');

        // Clean up the video container
        document.querySelector('.popup_modal .video-container').innerHTML = '';
    }
}

// Check if there are any play buttons before adding event listeners
const playButtons = document.querySelectorAll('.play-video');
if (playButtons.length > 0) {
    playButtons.forEach(button => {
        button.addEventListener('click', function () {
            const videoId = button.getAttribute('data-video-id');
            console.log(`Play button clicked for video ID: ${videoId}`);
            showModal(videoId);
        });
    });

    // Event listener for closing the modal
    const modal = document.querySelector('.popup_modal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal();
            }
        });

        document.querySelector('.close-modal').addEventListener('click', function () {
            closeModal();
        });
    }
}

// Load YouTube API and initialize everything
loadYouTubeAPI(function() {
    console.log('YouTube IFrame API loaded');
    window.onYouTubeIframeAPIReady = function() {
        console.log('YouTube IFrame API is ready');
    };
});
