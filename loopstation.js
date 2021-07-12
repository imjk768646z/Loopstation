document.write('<script src="./lame.all.js"></script>');
if (navigator.mediaDevices.getUserMedia){
	var constraints = { audio: true };
	console.log('success');
	
	navigator.mediaDevices.getUserMedia(constraints)
	.then(function(stream){
		document.getElementById("b_s1").addEventListener("mousedown", rcdBtn1_down);
		document.getElementById("b_s1").addEventListener("mouseup", rcdBtn1_up);
		document.getElementById("b_s2").addEventListener("mousedown", rcdBtn2_down);
		document.getElementById("b_s2").addEventListener("mouseup", rcdBtn2_up);
		document.getElementById("b_s3").addEventListener("mousedown", rcdBtn3_down);
		document.getElementById("b_s3").addEventListener("mouseup", rcdBtn3_up);
		document.getElementById("b_s4").addEventListener("mousedown", rcdBtn4_down);
		document.getElementById("b_s4").addEventListener("mouseup", rcdBtn4_up);
		document.getElementById("de1").addEventListener("mousedown", delRcd1_down);
		document.getElementById("de1").addEventListener("mouseup", delRcd1_up);
		document.getElementById("de2").addEventListener("mousedown", delRcd2_down);
		document.getElementById("de2").addEventListener("mouseup", delRcd2_up);
		document.getElementById("de3").addEventListener("mousedown", delRcd3_down);
		document.getElementById("de3").addEventListener("mouseup", delRcd3_up);
		document.getElementById("de4").addEventListener("mousedown", delRcd4_down);
		document.getElementById("de4").addEventListener("mouseup", delRcd4_up);
		document.getElementById("b_merge").addEventListener("mousedown", megBtn_down);
		document.getElementById("b_merge").addEventListener("mouseup", megBtn_up);
		document.getElementById("de_merge").addEventListener("mousedown", delMeg_down);
		document.getElementById("de_merge").addEventListener("mouseup", delMeg_up);
	
		const player1 = document.querySelector(".audio-player1");
		const player2 = document.querySelector(".audio-player2");
		const player3 = document.querySelector(".audio-player3");
		const player4 = document.querySelector(".audio-player4");
		const merge_player = document.querySelector(".audio-merge-player");

		var mediaRecorder1 = new MediaRecorder(stream);
		var mediaRecorder2 = new MediaRecorder(stream);
		var mediaRecorder3 = new MediaRecorder(stream);
		var mediaRecorder4 = new MediaRecorder(stream);
		
		var chunks1 = [];
		var chunks2 = [];
		var chunks3 = [];
		var chunks4 = [];
		var buffer = [];
		
		// console.log(chunks1);
		var fileReader1 = new FileReader();
		var fileReader2 = new FileReader();
		var fileReader3 = new FileReader();
		var fileReader4 = new FileReader();
		// console.log(fileReader1);	
		var arrayBuffer1, arrayBuffer2, arrayBuffer3, arrayBuffer4;
		var audioContext = new AudioContext();

		function rcdBtn1_down (){
			const b_s1 = document.getElementById("b_s1").value;
			const b_s2 = document.getElementById("b_s2").value;
			const b_s3 = document.getElementById("b_s3").value;
			const b_s4 = document.getElementById("b_s4").value;

			if(b_s1 == "開始"){
				if(b_s2 == "停止" || b_s3 == "停止" || b_s4 == "停止"){
					alert("錄音進行中，請先結束當前的錄音！");
				}else{
					var btnColor = document.getElementById("b_s1");
					btnColor.className = "record-btn-down";	
				}
			}else if(b_s1 == "停止"){
				var btnColor = document.getElementById("b_s1");
				btnColor.className = "button-stop-down";
			}else{
					alert("請先刪除第一個音軌(Track1)");
			}
		}

		function rcdBtn2_down (){
			const b_s2 = document.getElementById("b_s2").value;
			const b_s1 = document.getElementById("b_s1").value;
			const b_s3 = document.getElementById("b_s3").value;
			const b_s4 = document.getElementById("b_s4").value;
	
			if(b_s2 == "開始"){
				if(b_s1 == "停止" || b_s3 == "停止" || b_s4 == "停止"){
					alert("錄音進行中，請先結束當前的錄音！");
				}else{
					var btnColor = document.getElementById("b_s2");
					btnColor.className = "record-btn-down";
				}
			}else if(b_s2 == "停止"){
				var btnColor = document.getElementById("b_s2");
				btnColor.className = "button-stop-down";
			}else{
				alert("請先刪除第二個音軌(Track2)");
			}
		}

		function rcdBtn3_down (){
			const b_s3 = document.getElementById("b_s3").value;
			const b_s1 = document.getElementById("b_s1").value;
			const b_s2 = document.getElementById("b_s2").value;
			const b_s4 = document.getElementById("b_s4").value;

			if(b_s3 == "開始"){
				if(b_s1 == "停止" || b_s2 == "停止" || b_s4 == "停止"){
					alert("錄音進行中，請先結束當前的錄音！");
				}else{
					var btnColor = document.getElementById("b_s3");
					btnColor.className = "record-btn-down";
				}
			}else if(b_s3 == "停止"){
				var btnColor = document.getElementById("b_s3");
				btnColor.className = "button-stop-down";
			}else{
				alert("請先刪除第三個音軌(Track3)");
			}
		}

		function rcdBtn4_down (){
			const b_s4 = document.getElementById("b_s4").value;
			const b_s1 = document.getElementById("b_s1").value;
			const b_s2 = document.getElementById("b_s2").value;
			const b_s3 = document.getElementById("b_s3").value;

			if(b_s4 == "開始"){
				if(b_s1 == "停止" || b_s2 == "停止" || b_s3 == "停止"){
					alert("錄音進行中，請先結束當前的錄音！");
				}else{
					var btnColor = document.getElementById("b_s4");
					btnColor.className = "record-btn-down";
				}
			}else if(b_s4 == "停止"){
				var btnColor = document.getElementById("b_s4");
				btnColor.className = "button-stop-down";
			}else{
				alert("請先刪除第四個音軌(Track4)");
			}
		}

		function rcdBtn1_up (){
			const b_s1 = document.getElementById("b_s1").value;

			if(b_s1 == "開始"){	//滑鼠放開後開始錄音
				document.getElementById("b_s1").value = "停止";
				var btnColor = document.getElementById("b_s1");
				btnColor.className = "button-stop";
				mediaRecorder1.start();
				console.log(mediaRecorder1.state);
			}
			if(b_s1 == "停止"){ //滑鼠放開後停止錄音並將內容放入陣列
				document.getElementById("b_s1").value = "結束";
				var btnColor = document.getElementById("b_s1");
				btnColor.className = "button-block";			
				mediaRecorder1.stop();
				console.log(chunks1);
			}
		}			

		function rcdBtn2_up (){
			const b_s2 = document.getElementById("b_s2").value;

			if(b_s2 == "開始"){
				document.getElementById("b_s2").value = "停止";
				var btnColor = document.getElementById("b_s2");
				btnColor.className = "button-stop";
				mediaRecorder2.start();
				console.log(mediaRecorder2.state);
			}
			if(b_s2 == "停止"){
				document.getElementById("b_s2").value = "結束";
				var btnColor = document.getElementById("b_s2");
				btnColor.className = "button-block";
				mediaRecorder2.stop();
				console.log(chunks2);
			}
		}

		function rcdBtn3_up (){
			const b_s3 = document.getElementById("b_s3").value;

			if(b_s3 == "開始"){
				document.getElementById("b_s3").value = "停止";
				var btnColor = document.getElementById("b_s3");
				btnColor.className = "button-stop";
				mediaRecorder3.start();
				console.log(mediaRecorder3.state);				
			}
			if(b_s3 == "停止"){
				document.getElementById("b_s3").value = "結束";
				var btnColor = document.getElementById("b_s3");
				btnColor.className = "button-block";
				mediaRecorder3.stop();
				console.log(chunks3);
			}
		}

		function rcdBtn4_up (){
			const b_s4 = document.getElementById("b_s4").value;

			if(b_s4 == "開始"){
				document.getElementById("b_s4").value = "停止";
				var btnColor = document.getElementById("b_s4");
				btnColor.className = "button-stop";
				mediaRecorder4.start();
				console.log(mediaRecorder4.state);						
			}
			if(b_s4 == "停止"){
				document.getElementById("b_s4").value = "結束";
				var btnColor = document.getElementById("b_s4");
				btnColor.className = "button-block";
				mediaRecorder4.stop();
				console.log(chunks4);
			}
		}

		function delRcd1_down (){
			const b_s1 = document.getElementById("b_s1").value;

			if(b_s1 == "開始"){
				alert("請先錄製第一個音軌(Track1)！");
			}else if(b_s1 == "停止"){
				alert("錄音進行中，無法刪除音軌...");
			}else if(b_s1 == "結束"){
				var DelbtnColor = document.getElementById("de1");
				DelbtnColor.className = "delete-btn-down";
			}else{
				console.log("Error!");
			}
		}

		function delRcd2_down (){
			const b_s2 = document.getElementById("b_s2").value;

			if(b_s2 == "開始"){
				alert("請先錄製第二個音軌(Track2)！");
			}else if(b_s2 == "停止"){
				alert("錄音進行中，無法刪除音軌...");
			}else if(b_s2 == "結束"){
				var DelbtnColor = document.getElementById("de2");
				DelbtnColor.className = "delete-btn-down";
			}else{
				console.log("Error!");
			}
		}

		function delRcd3_down (){
			const b_s3 = document.getElementById("b_s3").value;

			if(b_s3 == "開始"){
				alert("請先錄製第三個音軌(Track3)！");
			}else if(b_s3 == "停止"){
				alert("錄音進行中，無法刪除音軌...");
			}else if(b_s3 == "結束"){
				var DelbtnColor = document.getElementById("de3");
				DelbtnColor.className = "delete-btn-down";
			}else{
				console.log("Error!");
			}
		}

		function delRcd4_down (){
			const b_s4 = document.getElementById("b_s4").value;

			if(b_s4 == "開始"){
				alert("請先錄製第四個音軌(Track4)！");
			}else if(b_s4 == "停止"){
				alert("錄音進行中，無法刪除音軌...");
			}else if(b_s4 == "結束"){
				var DelbtnColor = document.getElementById("de4");
				DelbtnColor.className = "delete-btn-down";
			}else{
				console.log("Error!");
			}
		}
		
		function delMeg_down (){
			if(buffer.length == 0){
			// if(1 < 0){
				alert("尚未合併音軌，沒有可刪除的內容！");
			}else{
				var DelbtnColor = document.getElementById("de_merge");
				DelbtnColor.className = "delete-btn-down";
				// window.location.assign(window.location.href);
			}	
		}

		function delRcd1_up (){
			var DelbtnColor = document.getElementById("de1");
			DelbtnColor.className = "delete-btn";

			var yes = confirm('您確定要刪除第一個音軌(Track1)嗎？');
			if(yes){
				if(chunks1.length == 0){
					console.log(chunks1);	
				}else{
					chunks1 = []; //將陣列設為空值
					console.log(chunks1);
					document.getElementById("b_s1").value = "開始"
					var btnColor = document.getElementById("b_s1");
					btnColor.className = "record-btn";						
					player1.src = "";
				}		
			}else{
				console.log('Nothing Happened');
			}
		}

		function delRcd2_up (){
			var DelbtnColor = document.getElementById("de2");
			DelbtnColor.className = "delete-btn";

			var yes = confirm('您確定要刪除第二個音軌(Track2)嗎？');
			if(yes){
				if(chunks2.length == 0){
					console.log(chunks2);	
				}else{
					chunks2 = []; //將陣列設為空值
					console.log(chunks2);
					document.getElementById("b_s2").value = "開始"
					var btnColor = document.getElementById("b_s2");
					btnColor.className = "record-btn";
					player2.src = "";
				}		
			}else{
				console.log('Nothing Happened');
			}
		}

		function delRcd3_up (){
			var DelbtnColor = document.getElementById("de3");
			DelbtnColor.className = "delete-btn";

			var yes = confirm('您確定要刪除第三個音軌(Track3)嗎？');
			if(yes){
				if(chunks3.length == 0){
					console.log(chunks3);	
				}else{
					chunks3 = []; //將陣列設為空值
					console.log(chunks3);
					document.getElementById("b_s3").value = "開始"
					var btnColor = document.getElementById("b_s3");
					btnColor.className = "record-btn";						
					player3.src = "";
				}		
			}else{
				console.log('Nothing Happened');
			}
		}

		function delRcd4_up (){
			var DelbtnColor = document.getElementById("de4");
			DelbtnColor.className = "delete-btn";

			var yes = confirm('您確定要刪除第四個音軌(Track4)嗎？');
			if(yes){
				if(chunks4.length == 0){
					console.log(chunks4);	
				}else{
					chunks4 = []; //將陣列設為空值
					console.log(chunks4);
					document.getElementById("b_s4").value = "開始"
					var btnColor = document.getElementById("b_s4");
					btnColor.className = "record-btn";
					player4.src = "";
				}		
			}else{
				console.log('Nothing Happened');
			}
		}
		
		function delMeg_up (){
			var DelbtnColor = document.getElementById("de_merge");
			DelbtnColor.className = "delete-btn";

			var yes = confirm('您確定要刪除所有音軌嗎？');
			if(yes){
				if(buffer.length == 0){
					console.log(buffer);	
				}else{
					buffer = []; //將陣列設為空值
					chunks1 = [];
					chunks2 = [];
					chunks3 = [];
					chunks4 = [];
					
					var btnColorM = document.getElementById("b_merge"),
						btnColor1 = document.getElementById("b_s1"),
						btnColor2 = document.getElementById("b_s2"),
						btnColor3 = document.getElementById("b_s3"),
						btnColor4 = document.getElementById("b_s4");
					
					document.getElementById("b_merge").value = "合併"
					document.getElementById("b_s1").value = "開始"
					document.getElementById("b_s2").value = "開始"
					document.getElementById("b_s3").value = "開始"
					document.getElementById("b_s4").value = "開始"
						
					btnColorM.className = "merge-btn";
					btnColor1.className = "record-btn";
					btnColor2.className = "record-btn";
					btnColor3.className = "record-btn";
					btnColor4.className = "record-btn";
						
					merge_player.src = "";
					player1.src = "";
					player2.src = "";
					player3.src = "";
					player4.src = "";
				}		
			}else{
				console.log('Nothing Happened');
			}
		}
		
		function megBtn_down (){
			const b_merge = document.getElementById("b_merge").value;
			if(b_merge == "合併"){
				if(chunks1.length == 0 && chunks2.length == 0 && chunks3.length == 0 && chunks4.length == 0){
					alert("尚未錄製音軌，沒有音檔可以合併！");
				}else if(chunks1.length != 0 && chunks2.length == 0 && chunks3.length == 0 && chunks4.length == 0){
					alert("至少錄製兩個音軌才能合併！");
				}else if(chunks1.length == 0 && chunks2.length != 0 && chunks3.length == 0 && chunks4.length == 0){
					alert("至少錄製兩個音軌才能合併！");
				}else if(chunks1.length == 0 && chunks2.length == 0 && chunks3.length != 0 && chunks4.length == 0){
					alert("至少錄製兩個音軌才能合併！");
				}else if(chunks1.length == 0 && chunks2.length == 0 && chunks3.length == 0 && chunks4.length != 0){
					alert("至少錄製兩個音軌才能合併！");
				}else{
					var btnColor = document.getElementById("b_merge");
					btnColor.className = "merge-btn-down";
				}
			}
			if(b_merge == "已合併"){
				alert("請先刪除已合併的音軌！");
			}
		}
		
		function megBtn_up (){
			const b_merge = document.getElementById("b_merge").value;
			document.getElementById("b_merge").value = "已合併";
			var btnColor = document.getElementById("b_merge");
			btnColor.className = "merge-btn-block";
			// console.log("merge all the buffers");
			merge();
			async function merge(){
				
				var max_audio,max_buffering;
				//列出所有情況				
				if (chunks1.length != 0 && chunks2 != 0 && chunks3 == 0 && chunks4 == 0){ //1(O) 2(O) 3(X) 4(X)
					let audioBuffer1 = await decodeaudiodata_1();
					let audioBuffer2 = await decodeaudiodata_2();
					let nowBuffering1 = audioBuffer1.getChannelData(0);
					let nowBuffering2 = audioBuffer2.getChannelData(0);
					var temp_max = nowBuffering1.length;
					
					if(temp_max <= nowBuffering2.length){
						temp_max = nowBuffering2.length;
					}
					if(temp_max >= nowBuffering2.length){
						temp_max = temp_max;
					}
					console.log("兩個陣列最長的長度：" + temp_max);
					
					if(temp_max == nowBuffering1.length){
						max_audio = audioBuffer1; //作為音源節點使用
						max_buffering = nowBuffering1; //作為合併陣列使用
					}
					if(temp_max == nowBuffering2.length){
						max_audio = audioBuffer2;
						max_buffering = nowBuffering2;
					}
					
					copy_merge(nowBuffering1,max_buffering);					
					copy_merge(nowBuffering2,max_buffering);
				}else if(chunks1.length != 0 && chunks2 != 0 && chunks3 != 0 && chunks4 == 0){ //1(O) 2(O) 3(O) 4(X)
					let audioBuffer1 = await decodeaudiodata_1();
					let audioBuffer2 = await decodeaudiodata_2();
					let audioBuffer3 = await decodeaudiodata_3();
					let nowBuffering1 = audioBuffer1.getChannelData(0);
					let nowBuffering2 = audioBuffer2.getChannelData(0);
					let nowBuffering3 = audioBuffer3.getChannelData(0);
					var temp_max = nowBuffering1.length;
					
					if(temp_max <= nowBuffering2.length){
						temp_max = nowBuffering2.length;
					}
					if(temp_max >= nowBuffering2.length){
						temp_max = temp_max;
					}			
					if(temp_max <= nowBuffering3.length){
						temp_max = nowBuffering3.length;
					}
					if(temp_max >= nowBuffering3.length){
						temp_max = temp_max;
					}	
					console.log("三個陣列最長的長度：" + temp_max);
					
					if(temp_max == nowBuffering1.length){
						max_audio = audioBuffer1; //作為音源節點使用
						max_buffering = nowBuffering1; //作為合併陣列使用
					}
					if(temp_max == nowBuffering2.length){
						max_audio = audioBuffer2;
						max_buffering = nowBuffering2;
					}				
					if(temp_max == nowBuffering3.length){
						max_audio = audioBuffer3;
						max_buffering = nowBuffering3;
					}
					
					copy_merge(nowBuffering1,max_buffering);					
					copy_merge(nowBuffering2,max_buffering);
					copy_merge(nowBuffering3,max_buffering);				
				}else if (chunks1.length != 0 && chunks2 != 0 && chunks3 == 0 && chunks4 != 0){ //1(O) 2(O) 3(X) 4(O)
					let audioBuffer1 = await decodeaudiodata_1();
					let audioBuffer2 = await decodeaudiodata_2();
					let audioBuffer4 = await decodeaudiodata_4();
					let nowBuffering1 = audioBuffer1.getChannelData(0);
					let nowBuffering2 = audioBuffer2.getChannelData(0);
					let nowBuffering4 = audioBuffer4.getChannelData(0);
					var temp_max = nowBuffering1.length;
					// var max_audio,max_buffering;
					
					if(temp_max <= nowBuffering2.length){
						temp_max = nowBuffering2.length;
					}
					if(temp_max >= nowBuffering2.length){
						temp_max = temp_max;
					}			
					if(temp_max <= nowBuffering4.length){
						temp_max = nowBuffering4.length;
					}
					if(temp_max >= nowBuffering4.length){
						temp_max = temp_max;
					}	
					console.log("三個陣列最長的長度：" + temp_max);
					
					if(temp_max == nowBuffering1.length){
						max_audio = audioBuffer1; //作為音源節點使用
						max_buffering = nowBuffering1; //作為合併陣列使用
					}
					if(temp_max == nowBuffering2.length){
						max_audio = audioBuffer2;
						max_buffering = nowBuffering2;
					}				
					if(temp_max == nowBuffering4.length){
						max_audio = audioBuffer4;
						max_buffering = nowBuffering4;
					}
					
					copy_merge(nowBuffering1,max_buffering);					
					copy_merge(nowBuffering2,max_buffering);
					copy_merge(nowBuffering4,max_buffering);
				}else if(chunks1.length != 0 && chunks2 != 0 && chunks3 != 0 && chunks4 != 0){ //1(O) 2(O) 3(O) 4(O)
					let audioBuffer1 = await decodeaudiodata_1();
					let audioBuffer2 = await decodeaudiodata_2();
					let audioBuffer3 = await decodeaudiodata_3();
					let audioBuffer4 = await decodeaudiodata_4();
					let nowBuffering1 = audioBuffer1.getChannelData(0);
					let nowBuffering2 = audioBuffer2.getChannelData(0);
					let nowBuffering3 = audioBuffer3.getChannelData(0);
					let nowBuffering4 = audioBuffer4.getChannelData(0);
					var temp_max = nowBuffering1.length;
					// var max_audio,max_buffering;
					
					if(temp_max <= nowBuffering2.length){
						temp_max = nowBuffering2.length;
					}
					if(temp_max >= nowBuffering2.length){
						temp_max = temp_max;
					}
					if(temp_max <= nowBuffering3.length){
						temp_max = nowBuffering3.length;
					}
					if(temp_max >= nowBuffering3.length){
						temp_max = temp_max;
					}					
					if(temp_max <= nowBuffering4.length){
						temp_max = nowBuffering4.length;
					}
					if(temp_max >= nowBuffering4.length){
						temp_max = temp_max;
					}	
					console.log("四個陣列最長的長度：" + temp_max);
					
					if(temp_max == nowBuffering1.length){
						max_audio = audioBuffer1; //作為音源節點使用
						max_buffering = nowBuffering1; //作為合併陣列使用
					}
					if(temp_max == nowBuffering2.length){
						max_audio = audioBuffer2;
						max_buffering = nowBuffering2;
					}
					if(temp_max == nowBuffering3.length){
						max_audio = audioBuffer3;
						max_buffering = nowBuffering3;
					}
					if(temp_max == nowBuffering4.length){
						max_audio = audioBuffer4;
						max_buffering = nowBuffering4;
					}
					
					copy_merge(nowBuffering1,max_buffering);					
					copy_merge(nowBuffering2,max_buffering);
					copy_merge(nowBuffering3,max_buffering);
					copy_merge(nowBuffering4,max_buffering);
				}else if(chunks1.length != 0 && chunks2 == 0 && chunks3 != 0 && chunks4 != 0){ //1(O) 2(X) 3(O) 4(O)
					let audioBuffer1 = await decodeaudiodata_1();
					let audioBuffer3 = await decodeaudiodata_3();
					let audioBuffer4 = await decodeaudiodata_4();
					let nowBuffering1 = audioBuffer1.getChannelData(0);
					let nowBuffering3 = audioBuffer3.getChannelData(0);
					let nowBuffering4 = audioBuffer4.getChannelData(0);
					var temp_max = nowBuffering1.length;
					// var max_audio,max_buffering;
					
					if(temp_max <= nowBuffering3.length){
						temp_max = nowBuffering3.length;
					}
					if(temp_max >= nowBuffering3.length){
						temp_max = temp_max;
					}					
					if(temp_max <= nowBuffering4.length){
						temp_max = nowBuffering4.length;
					}
					if(temp_max >= nowBuffering4.length){
						temp_max = temp_max;
					}	
					console.log("三個陣列最長的長度：" + temp_max);
					
					if(temp_max == nowBuffering1.length){
						max_audio = audioBuffer1; //作為音源節點使用
						max_buffering = nowBuffering1; //作為合併陣列使用
					}
					if(temp_max == nowBuffering3.length){
						max_audio = audioBuffer3;
						max_buffering = nowBuffering3;
					}
					if(temp_max == nowBuffering4.length){
						max_audio = audioBuffer4;
						max_buffering = nowBuffering4;
					}
					
					copy_merge(nowBuffering1,max_buffering);					
					copy_merge(nowBuffering3,max_buffering);
					copy_merge(nowBuffering4,max_buffering);
				}else if(chunks1.length != 0 && chunks2 == 0 && chunks3 != 0 && chunks4 == 0){ //1(O) 2(X) 3(O) 4(X)
					let audioBuffer1 = await decodeaudiodata_1();
					let audioBuffer3 = await decodeaudiodata_3();
					let nowBuffering1 = audioBuffer1.getChannelData(0);
					let nowBuffering3 = audioBuffer3.getChannelData(0);
					var temp_max = nowBuffering1.length;
					// var max_audio,max_buffering;
					
					if(temp_max <= nowBuffering3.length){
						temp_max = nowBuffering3.length;
					}
					if(temp_max >= nowBuffering3.length){
						temp_max = temp_max;
					}					
					console.log("兩個陣列最長的長度：" + temp_max);
					
					if(temp_max == nowBuffering1.length){
						max_audio = audioBuffer1; //作為音源節點使用
						max_buffering = nowBuffering1; //作為合併陣列使用
					}
					if(temp_max == nowBuffering3.length){
						max_audio = audioBuffer3;
						max_buffering = nowBuffering3;
					}
					
					copy_merge(nowBuffering1,max_buffering);					
					copy_merge(nowBuffering3,max_buffering);
				}else if(chunks1.length != 0 && chunks2 == 0 && chunks3 == 0 && chunks4 != 0){ //1(O) 2(X) 3(X) 4(O)
					let audioBuffer1 = await decodeaudiodata_1();
					let audioBuffer4 = await decodeaudiodata_4();
					let nowBuffering1 = audioBuffer1.getChannelData(0);
					let nowBuffering4 = audioBuffer4.getChannelData(0);
					var temp_max = nowBuffering1.length;
					// var max_audio,max_buffering;
					
					if(temp_max <= nowBuffering4.length){
						temp_max = nowBuffering4.length;
					}
					if(temp_max >= nowBuffering4.length){
						temp_max = temp_max;
					}					
					console.log("兩個陣列最長的長度：" + temp_max);
					
					if(temp_max == nowBuffering1.length){
						max_audio = audioBuffer1; //作為音源節點使用
						max_buffering = nowBuffering1; //作為合併陣列使用
					}
					if(temp_max == nowBuffering4.length){
						max_audio = audioBuffer4;
						max_buffering = nowBuffering4;
					}
					
					copy_merge(nowBuffering1,max_buffering);					
					copy_merge(nowBuffering4,max_buffering);
				}else if(chunks1.length == 0 && chunks2 != 0 && chunks3 != 0 && chunks4 != 0){ //1(X) 2(O) 3(O) 4(O)
					let audioBuffer2 = await decodeaudiodata_2();
					let audioBuffer3 = await decodeaudiodata_3();
					let audioBuffer4 = await decodeaudiodata_4();
					let nowBuffering2 = audioBuffer2.getChannelData(0);
					let nowBuffering3 = audioBuffer3.getChannelData(0);
					let nowBuffering4 = audioBuffer4.getChannelData(0);
					var temp_max = nowBuffering2.length;
					// var max_audio,max_buffering;
					
					if(temp_max <= nowBuffering3.length){
						temp_max = nowBuffering3.length;
					}
					if(temp_max >= nowBuffering3.length){
						temp_max = temp_max;
					}					
					if(temp_max <= nowBuffering4.length){
						temp_max = nowBuffering4.length;
					}
					if(temp_max >= nowBuffering4.length){
						temp_max = temp_max;
					}	
					console.log("三個陣列最長的長度：" + temp_max);
					
					if(temp_max == nowBuffering2.length){
						max_audio = audioBuffer2; //作為音源節點使用
						max_buffering = nowBuffering2; //作為合併陣列使用
					}
					if(temp_max == nowBuffering3.length){
						max_audio = audioBuffer3;
						max_buffering = nowBuffering3;
					}
					if(temp_max == nowBuffering4.length){
						max_audio = audioBuffer4;
						max_buffering = nowBuffering4;
					}
					
					copy_merge(nowBuffering2,max_buffering);					
					copy_merge(nowBuffering3,max_buffering);
					copy_merge(nowBuffering4,max_buffering);
				}else if(chunks1.length == 0 && chunks2 != 0 && chunks3 == 0 && chunks4 != 0){ //1(X) 2(O) 3(X) 4(O)
					let audioBuffer2 = await decodeaudiodata_2();
					let audioBuffer4 = await decodeaudiodata_4();
					let nowBuffering2 = audioBuffer2.getChannelData(0);
					let nowBuffering4 = audioBuffer4.getChannelData(0);
					var temp_max = nowBuffering2.length;
					// var max_audio,max_buffering;
					
					if(temp_max <= nowBuffering4.length){
						temp_max = nowBuffering4.length;
					}
					if(temp_max >= nowBuffering4.length){
						temp_max = temp_max;
					}					
					console.log("兩個陣列最長的長度：" + temp_max);
					
					if(temp_max == nowBuffering2.length){
						max_audio = audioBuffer2; //作為音源節點使用
						max_buffering = nowBuffering2; //作為合併陣列使用
					}
					if(temp_max == nowBuffering4.length){
						max_audio = audioBuffer4;
						max_buffering = nowBuffering4;
					}
					
					copy_merge(nowBuffering2,max_buffering);					
					copy_merge(nowBuffering4,max_buffering);
				}else if(chunks1.length == 0 && chunks2 != 0 && chunks3 != 0 && chunks4 == 0){ //1(X) 2(O) 3(O) 4(X)
					let audioBuffer2 = await decodeaudiodata_2();
					let audioBuffer3 = await decodeaudiodata_3();
					let nowBuffering2 = audioBuffer2.getChannelData(0);
					let nowBuffering3 = audioBuffer3.getChannelData(0);
					var temp_max = nowBuffering2.length;
					// var max_audio,max_buffering;
					
					if(temp_max <= nowBuffering3.length){
						temp_max = nowBuffering3.length;
					}
					if(temp_max >= nowBuffering3.length){
						temp_max = temp_max;
					}					
					console.log("兩個陣列最長的長度：" + temp_max);
					
					if(temp_max == nowBuffering2.length){
						max_audio = audioBuffer2; //作為音源節點使用
						max_buffering = nowBuffering2; //作為合併陣列使用
					}
					if(temp_max == nowBuffering3.length){
						max_audio = audioBuffer3;
						max_buffering = nowBuffering3;
					}
					
					copy_merge(nowBuffering2,max_buffering);					
					copy_merge(nowBuffering3,max_buffering);
				}else if(chunks1.length == 0 && chunks2 == 0 && chunks3 != 0 && chunks4 != 0){ //1(X) 2(X) 3(O) 4(O)
					let audioBuffer3 = await decodeaudiodata_3();
					let audioBuffer4 = await decodeaudiodata_4();
					let nowBuffering3 = audioBuffer3.getChannelData(0);
					let nowBuffering4 = audioBuffer4.getChannelData(0);
					var temp_max = nowBuffering3.length;
					// var max_audio,max_buffering;
					
					if(temp_max <= nowBuffering4.length){
						temp_max = nowBuffering4.length;
					}
					if(temp_max >= nowBuffering4.length){
						temp_max = temp_max;
					}					
					console.log("兩個陣列最長的長度：" + temp_max);
					
					if(temp_max == nowBuffering3.length){
						max_audio = audioBuffer3; //作為音源節點使用
						max_buffering = nowBuffering3; //作為合併陣列使用
					}
					if(temp_max == nowBuffering4.length){
						max_audio = audioBuffer4;
						max_buffering = nowBuffering4;
					}
					
					copy_merge(nowBuffering3,max_buffering);					
					copy_merge(nowBuffering4,max_buffering);
				}else{
					console.log("error");
				}
																						
				function copy_merge (current_array,max_array){
					var fit_length;
					// console.log("current_array" + current_array);
					// console.log("max_array" + max_array);
					if(temp_max == current_array.length){
					// console.log("最長的陣列為：" + arr + " 不用自我複製資料");
					}else{
						console.log("該陣列需要自我複製資料");
						fit_length = Math.floor((temp_max / current_array.length)) * current_array.length;
						console.log("fit_length:" + fit_length);
						//短陣列從左到右複製資料直到符合預期長度
						for(i=0; i<fit_length; i = i + current_array.length){
							for(j=0; j<current_array.length; j++){
				
							max_array[i+j] = max_array[i+j] + current_array[j];
							}
						}
						// console.log(max_array);
					}
				}
				
				// Get an AudioBufferSourceNode.
				// let source = audioContext.createBufferSource();
				// source.buffer = max_audio;
				// source.connect(audioContext.destination);
				// source.start();
				// Get an AudioBufferSourceNode.
				
				audioBufferToWav(max_audio);
			}
		}
		
		function audioBufferToWav(aBuffer){
			// console.log(aBuffer);
			let numOfChan = aBuffer.numberOfChannels,
				btwLength = aBuffer.length * numOfChan * 2 + 44,
				btwArrBuff = new ArrayBuffer(btwLength),
				btwView = new DataView(btwArrBuff),
				btwChnls = [],
				btwIndex,
				btwSample,
				btwOffset = 0,
				btwPos = 0;
			setUint32(0x46464952); // "RIFF"
			setUint32(btwLength - 8); // file length - 8
			setUint32(0x45564157); // "WAVE"
			setUint32(0x20746d66); // "fmt " chunk
			setUint32(16); // length = 16
			setUint16(1); // PCM (uncompressed)
			setUint16(numOfChan);
			setUint32(aBuffer.sampleRate);
			setUint32(aBuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
			setUint16(numOfChan * 2); // block-align
			setUint16(16); // 16-bit
			setUint32(0x61746164); // "data" - chunk
			setUint32(btwLength - btwPos - 4); // chunk length

			for (btwIndex = 0; btwIndex < aBuffer.numberOfChannels; btwIndex++)
				btwChnls.push(aBuffer.getChannelData(btwIndex));

			while (btwPos < btwLength) {
				for (btwIndex = 0; btwIndex < numOfChan; btwIndex++) {
					// interleave btwChnls
					btwSample = Math.max(-1, Math.min(1, btwChnls[btwIndex][btwOffset])); // clamp
					btwSample = (0.5 + btwSample < 0 ? btwSample * 32768 : btwSample * 32767) | 0; // scale to 16-bit signed int
					btwView.setInt16(btwPos, btwSample, true); // write 16-bit sample
					btwPos += 2;
				}
				btwOffset++; // next source sample
			}

			let wavHdr = lamejs.WavHeader.readHeader(new DataView(btwArrBuff));
			let wavSamples = new Int16Array(btwArrBuff, wavHdr.dataOffset, wavHdr.dataLen / 2);
			// console.log(wavHdr.channels, wavHdr.sampleRate, wavSamples);
				
			wavToMp3(wavHdr.channels, wavHdr.sampleRate, wavSamples);

			function setUint16(data) {
				btwView.setUint16(btwPos, data, true);
				btwPos += 2;
			}
			function setUint32(data) {
				btwView.setUint32(btwPos, data, true);
				btwPos += 4;
			}			
		}
				
		function wavToMp3(channels, sampleRate, samples) {
			// var buffer = [];
			var mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
			var remaining = samples.length;
			var samplesPerFrame = 1152;
			for (var i = 0; remaining >= samplesPerFrame; i += samplesPerFrame) {
				var mono = samples.subarray(i, i + samplesPerFrame);
				var mp3buf = mp3enc.encodeBuffer(mono);
				if (mp3buf.length > 0) {
					buffer.push(new Int8Array(mp3buf));
				}
				remaining -= samplesPerFrame;
			}
			var d = mp3enc.flush();
			if(d.length > 0){
				buffer.push(new Int8Array(d));
			}

			var mp3Blob = new Blob(buffer, {type: 'audio/mp3'});
			var bUrl = window.URL.createObjectURL(mp3Blob);
			// player_merge.src = bUrl;
			merge_player.controls = true;
			merge_player.src = bUrl;
			// set the filename
			var fileName = prompt('輸入您專屬的檔案名稱','我的音樂');
			var a = document.createElement("a");
			// document.body.appendChild(a);
			a.href = bUrl;
			a.download = fileName;
			a.click();
			// send the download link to the console					
			console.log('mp3 download:', bUrl);
			// audio.title = "file.mp3"
			return buffer;
		}
				
		//異步解碼，獲取第一個音頻的audioBuffer1
		async function decodeaudiodata_1(){
			arrayBuffer1 = fileReader1.result;
			return audioContext.decodeAudioData(arrayBuffer1, (audioBuffer) => {});			
		}

		//異步解碼，獲取第二個音頻的audioBuffer2
		async function decodeaudiodata_2(){
			arrayBuffer2 = fileReader2.result;
			return audioContext.decodeAudioData(arrayBuffer2, (audioBuffer) => {});	
		}
		
		//異步解碼，獲取第三個音頻的audioBuffer3
		async function decodeaudiodata_3(){
			arrayBuffer3 = fileReader3.result;
			return audioContext.decodeAudioData(arrayBuffer3, (audioBuffer) => {});		
		}
		
		//異步解碼，獲取第四個音頻的audioBuffer4
		async function decodeaudiodata_4(){
			arrayBuffer4 = fileReader4.result;
			return audioContext.decodeAudioData(arrayBuffer4, (audioBuffer) => {});		
		}
		
		mediaRecorder1.ondataavailable = (e) => {
			chunks1.push(e.data);
		}
		
		mediaRecorder2.ondataavailable = (e) => {
			chunks2.push(e.data);
		}
		
		mediaRecorder3.ondataavailable = (e) => {
			chunks3.push(e.data);
		}
		
		mediaRecorder4.ondataavailable = (e) => {
			chunks4.push(e.data);
		}
		
		mediaRecorder1.onstop = (e) => {
			var blob = new Blob(chunks1, { 'type' : 'audio/ogg; codecs=opus' });
			player1.controls = true;
			var audioURL = window.URL.createObjectURL(blob);
			player1.src = audioURL;
			player1.loop = true;
			player1.play();
			console.log(chunks1);
			console.log(blob);
			fileReader1.readAsArrayBuffer(blob);
		}
		
		mediaRecorder2.onstop = (e) => {
			var blob = new Blob(chunks2, { 'type' : 'audio/ogg; codecs=opus' });
			player2.controls = true;
			var audioURL = window.URL.createObjectURL(blob);
			player2.src = audioURL;
			player2.loop = true;
			player2.play();
			console.log(blob);
			fileReader2.readAsArrayBuffer(blob);
		}
		
		mediaRecorder3.onstop = (e) => {
			var blob = new Blob(chunks3, { 'type' : 'audio/ogg; codecs=opus' });
			player3.controls = true;
			var audioURL = window.URL.createObjectURL(blob);
			player3.src = audioURL;
			player3.loop = true;
			player3.play();
			console.log(blob);
			fileReader3.readAsArrayBuffer(blob);
		}
		
		mediaRecorder4.onstop = (e) => {
			var blob = new Blob(chunks4, { 'type' : 'audio/ogg; codecs=opus' });
			player4.controls = true;
			var audioURL = window.URL.createObjectURL(blob);
			player4.src = audioURL;
			player4.loop = true;
			player4.play();
			console.log(blob);
			fileReader4.readAsArrayBuffer(blob);
		}

	})
	.catch(function(err){
		console.log(err);
	});
}