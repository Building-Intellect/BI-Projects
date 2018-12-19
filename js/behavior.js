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
	var __PDF_PATH,
		__PDF_DOC,
		__CURRENT_PAGE,
		__TOTAL_PAGES,
		__PAGE_RENDERING_IN_PROGRESS,
		__PAGE_NUM_PENDING,
		__SINGLE_HEIGHT,
		__SINGLE_WIDTH,
		__CANVAS_1,
		__CANVAS_CTX_1,
		__CANVAS_2,
		__CANVAS_CTX_2,
		__CANVAS_3,
		__CANVAS_CTX_3,
		__CANVAS_4,
		__CANVAS_CTX_4;

	pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

	// initialize variables and event handlers for viewer lightbox
	window.initializePdfViewer = function () {
		__PAGE_RENDERING_IN_PROGRESS = false;
		__PAGE_NUM_PENDING = null;

		__CANVAS_1 = $('#pdf-canvas-1').get(0);
		__CANVAS_CTX_1 = __CANVAS_1.getContext('2d');
		__CANVAS_2 = $('#pdf-canvas-2').get(0);
		__CANVAS_CTX_2 = __CANVAS_2.getContext('2d');
		__CANVAS_3 = $('#pdf-canvas-3').get(0);
		__CANVAS_CTX_3 = __CANVAS_3.getContext('2d');
		__CANVAS_4 = $('#pdf-canvas-4').get(0);
		__CANVAS_CTX_4 = __CANVAS_4.getContext('2d');

		// When user chooses a PDF file
		$("#plans-select").on('change', function() {
			// TODO: validate whether file is pdf
			__PDF_PATH = $("#plans-select").val();
			showPDF(__PDF_PATH);
		});

		// Previous 4 pages of the PDF, unless user is close to first page
		$("#plans-prev-4").on('click', function() {
			if(__CURRENT_PAGE - 4 >= 1) {
				queuePage(__CURRENT_PAGE - 4);
			} else if (__CURRENT_PAGE - 1 >= 1) {
				queuePage(__CURRENT_PAGE - 1);
			}
		});

		// Next 4 pages of the PDF, unless user is close to total pages
		$("#plans-next-4").on('click', function() {
			if(__CURRENT_PAGE + 4 < __TOTAL_PAGES) {
				queuePage(__CURRENT_PAGE + 4);
			} else if (__CURRENT_PAGE + 1 <= __TOTAL_PAGES) {
				queuePage(__CURRENT_PAGE + 1);
			}
		});

		// Get pdf file path from select element
		__PDF_PATH = $("#plans-select").val();
		showPDF(__PDF_PATH);
	}

	// If other pages are rendering still, waits until completed
	function queuePage(num) {
		if (__PAGE_RENDERING_IN_PROGRESS) {
			__PAGE_NUM_PENDING = num;
		} else {
			showPages(num);
		}
	}

	// load the pdf into the viewer, render pages, and update total pages
	function showPDF(pdf_url) {
		$(".pdf-canvas").hide();
		$(".pdf-loader").show();

		var docLoadingTask = pdfjsLib.getDocument({ url: pdf_url });
		docLoadingTask.promise.then(function(pdf_doc) {

			__PDF_DOC = pdf_doc;
			__TOTAL_PAGES = __PDF_DOC.numPages;
			// Hide the pdf loader and show pdf containers in HTML
			$(".pdf-loader").hide();
			$(".pdf-contents").show();
			$("#pdf-total-pages").text(__TOTAL_PAGES);

			var elements = document.getElementsByClassName('plans-single');
			var singleViewer = elements[0];
			__SINGLE_WIDTH = singleViewer.clientWidth + 100;
			__SINGLE_HEIGHT = singleViewer.clientHeight + 100;

			// Show the first four pages
			showPages(1);
			populateExpands();
		}).catch(function(error) {
			// If error hide loader and trigger alert
			$(".pdf-loader").hide();
			alert(error.message);
		});
	}

	// show and hide certain elements and render four pages of pdf
	function showPages(page_num) {
		__PAGE_RENDERING_IN_PROGRESS = true;
		__CURRENT_PAGE = page_num;

		// Disable Prev & Next buttons while pages are being loaded
		$("#plans-next-4, #plans-prev-4").attr('disabled', 'disabled');

		// While pages are being rendered hide the canvases and show loading messages
		$(".pdf-canvas").hide();
		$(".page-loader").show();

		// Populate expand button links with correct page numbers
		populateExpands();

		// Update current pages in HTML
		var currentFirstPage = page_num;
		var currentLastPage = page_num + 3;
		$("#pdf-current-pages").text('Pages ' + currentFirstPage + '-' + currentLastPage + ' of ');

		// Fetch the first page
		__PDF_DOC.getPage(page_num).then(function(page) {
			renderIndividual(page, __CANVAS_1, __CANVAS_CTX_1);
		});

		// Fetch the second page
		__PDF_DOC.getPage(page_num + 1).then(function(page) {
			renderIndividual(page, __CANVAS_2, __CANVAS_CTX_2);
		});

		// Fetch the third page
		__PDF_DOC.getPage(page_num + 2).then(function(page) {
			renderIndividual(page, __CANVAS_3, __CANVAS_CTX_3);
		});

		// Fetch the fourth page
		__PDF_DOC.getPage(page_num + 3).then(function(page) {
			renderIndividual(page, __CANVAS_4, __CANVAS_CTX_4);
		});
	}

	// render a single pdf page in a single pdf viewer
	function renderIndividual(page, canvas, ctx) {
		// set viewport according to canvas width and height
		var unscaledViewport = page.getViewport(1.0);
		var scale = Math.max((__SINGLE_HEIGHT / unscaledViewport.height), (__SINGLE_WIDTH / unscaledViewport.width));
		var viewport = page.getViewport(scale);

		// or manually set the viewport with specified scale
		//var viewport = page.getViewport(0.5);

		// Set canvas dimensions
		canvas.height = viewport.height;
		canvas.width = viewport.width;

		var renderContext = {
			canvasContext: ctx,
			viewport: viewport
		};

		// Render the page contents in the canvas
		var pageRenderTask = page.render(renderContext);
		pageRenderTask.promise.then(function() {
			__PAGE_RENDERING_IN_PROGRESS = false;
			if (__PAGE_NUM_PENDING !== null) {
				// New page rendering is pending
				showPages(__PAGE_NUM_PENDING);
				__PAGE_NUM_PENDING = null;
			}
			// Re-enable Prev & Next buttons
			$("#plans-next-4, #plans-prev-4").removeAttr('disabled');
			// Show the canvas and hide the page loader
			$(".pdf-canvas").show();
			$(".page-loader").hide();
		});
	}

	// populate the expand links based on pages and selected pdf
	function populateExpands() {
		var viewerPath = $("#plans-hidden").attr('viewerPath');
		$(".plans-expand").each(function(i) {
			var curPageNum = __CURRENT_PAGE + i;
			$(this).attr('href', viewerPath + __PDF_PATH + '#page=' + curPageNum);
		});
	}
})();
