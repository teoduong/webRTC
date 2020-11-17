(async () => {
	var video = document.querySelector('#video');
	var video2 = document.querySelector('#video2');
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	video.srcObject = stream;

	var pc1 = new RTCPeerConnection();

	var pc2 = new RTCPeerConnection();

	pc2.addEventListener('track', (e) => {
		console.log(e.streams[0]);

		video2.srcObject = e.streams[0];
	});

	stream.getTracks().forEach(track => pc1.addTrack(track, stream));
	const offerOptions = {
	  offerToReceiveAudio: 1,
	  offerToReceiveVideo: 1
	};
	const offer = await pc1.createOffer(offerOptions);
	
	console.log(offer);

	await pc1.setLocalDescription(offer);

	await pc2.setRemoteDescription(offer);

	const answer = await pc2.createAnswer();

	await pc1.setRemoteDescription(answer);

	await pc2.setLocalDescription(answer);

})();