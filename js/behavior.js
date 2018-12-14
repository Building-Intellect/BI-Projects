"use strict";

(function(){

	// global behavior on page load
	window.onload = function() {

	};

	// for issue edit form
    var expanded = false;
    window.showNotifyCheckboxes = function() {
        var checkboxes = document.getElementById("notify-checkboxes");
        if (!expanded) {
            checkboxes.style.display = "block";
			document.getElementById("recipients").style.borderColor = "#9ccfca";
            expanded = true;
        } else {
			var inputs = checkboxes.getElementsByTagName('input');
			document.getElementById("recipients").innerHTML = "";
		    for (var i = 0; i < inputs.length; i++) {
				var curInput = inputs[i];
				var label = document.querySelector("label[for='" + curInput.id + "']");
		        if (curInput.type == 'checkbox' && curInput.checked == true) {
					document.getElementById("recipients").innerHTML += label.innerText + ", ";
		        }
		    }
			document.getElementById("recipients").style.borderColor = "#dde2eb";
            checkboxes.style.display = "none";
            expanded = false;
        }
    }

	// for none checkbox within issue edit form
	window.handleNoneCheckbox = function() {
		var noneCheckbox = document.getElementById("0");
		var noneLabel = document.querySelector("label[for='0']");
		var inputs = document.getElementById("notify-checkboxes").getElementsByTagName('input');
		for (var i = 1; i < inputs.length; i++) {
			if (noneCheckbox.checked == true) {
				inputs[i].checked = false;
				inputs[i].disabled = true;
			} else {
				inputs[i].disabled = false;
			}
		}
		document.getElementById("recipients").innerHTML = noneLabel.innerText;
	}

	// function to check if user is on a mobile device for compatibility
    function mobilecheck() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

	// functions and variables for project plans pdf viewer
	var __PDF_DOC,
		__CURRENT_PAGE,
		__TOTAL_PAGES,
		__PAGE_RENDERING_IN_PROGRESS,
		__PAGE_NUM_PENDING,
		__CANVAS,
		__CANVAS_CTX,
		__CANVAS_CONTAINER;

	pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker1.js';

	window.initializePdfViewer = function () {
		__PAGE_RENDERING_IN_PROGRESS = false;
		__PAGE_NUM_PENDING = null;
		__CANVAS = $('#pdf-canvas').get(0);
		__CANVAS_CTX = __CANVAS.getContext('2d');
		__CANVAS_CONTAINER = document.getElementById('pdf-container');
		// When user chooses a PDF file
		$("#plans-select").on('change', function() {
			// TODO: validate whether file is pdf
			var pdf_file = $("#plans-select").val();
			showPDF(pdf_file);
		});
		// Previous 4 pages of the PDF
		$("#plans-prev-4").on('click', function() {
			if(__CURRENT_PAGE != 1)
				queuePage(--__CURRENT_PAGE);
		});
		// Next 4 pages of the PDF
		$("#plans-next-4").on('click', function() {
			if(__CURRENT_PAGE != __TOTAL_PAGES)
				queuePage(++__CURRENT_PAGE);
		});
		var pdf_file = $("#plans-select").val();
		showPDF(pdf_file);
	}

	/**
	* If another page rendering in progress, waits until the rendering is
	* finised. Otherwise, executes rendering immediately.
	*/
	function queuePage(num) {
		if (__PAGE_RENDERING_IN_PROGRESS) {
			__PAGE_NUM_PENDING = num;
		} else {
			showPage(num);
		}
	}

	function showPDF(pdf_url) {
		$("#pdf-canvas").hide();
		$("#pdf-loader").show();

		var docLoadingTask = pdfjsLib.getDocument({ url: pdf_url });
		docLoadingTask.promise.then(function(pdf_doc) {
			//alert(document.getElementById('pdf-container-1').clientWidth);

			__PDF_DOC = pdf_doc;
			__TOTAL_PAGES = __PDF_DOC.numPages;
			// Hide the pdf loader and show pdf container in HTML
			$("#pdf-loader").hide();
			$(".pdf-contents").show();
			$("#pdf-total-pages").text(__TOTAL_PAGES);
			// Show the first page
			showPage(1);
		}).catch(function(error) {
			// If error hide loader and trigger alert
			$("#pdf-loader").hide();
			alert(error.message);
		});
	}

	function showPage(page_num) {
		__PAGE_RENDERING_IN_PROGRESS = true;
		__CURRENT_PAGE = page_num;

		// Disable Prev & Next buttons while page is being loaded
		$("#plans-next-4, #plans-prev-4").attr('disabled', 'disabled');

		// While page is being rendered hide the canvas and show a loading message
		$("#pdf-canvas").hide();
		$("#page-loader").show();

		// Update current page in HTML
		$("#pdf-current-page").text(page_num);

		// Fetch the page
		__PDF_DOC.getPage(page_num).then(function(page) {
			var canvasWidth = document.getElementById('pdf-container-1').clientWidth + 100;
			var canvasHeight = document.getElementById('pdf-container-1').clientHeight + 100;

			// set viewport according to canvas width and height
			var unscaledViewport = page.getViewport(1.0);
			var scale = Math.max((canvasWidth / unscaledViewport.height), (canvasHeight / unscaledViewport.width));
			var viewport = page.getViewport(scale);

			// or manually set the viewport with specified scale
			//var viewport = page.getViewport(0.5);

			// Set canvas dimensions
			__CANVAS.height = viewport.height;
			__CANVAS.width = viewport.width;

			var renderContext = {
				canvasContext: __CANVAS_CTX,
				viewport: viewport
			};

			// Render the page contents in the canvas
			var pageRenderTask = page.render(renderContext);
			pageRenderTask.promise.then(function() {
				__PAGE_RENDERING_IN_PROGRESS = false;
				if (__PAGE_NUM_PENDING !== null) {
					// New page rendering is pending
					showPage(__PAGE_NUM_PENDING);
					__PAGE_NUM_PENDING = null;
				}
				// Re-enable Prev & Next buttons
				$("#plans-next-4, #plans-prev-4").removeAttr('disabled');
				// Show the canvas and hide the page loader
				$("#pdf-canvas").show();
				$("#page-loader").hide();
			});
		});
	}
})();
