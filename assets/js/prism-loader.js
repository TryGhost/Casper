
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function prism_markdown(){
    // All code elements with class language-* or lang-*
    var codeEls = $('pre > code[class*=lang-], pre > code[class*=language-]');
    if (codeEls.length) {
        // For each code element
        codeEls.each(function() {
            var pre = $(this).parent();
            // Process line-numbers
            if ($(this).attr('class').indexOf("line-numbers") >= 0) {
                // remove line-numbers from code and add it to pre
                $(this).attr('class', $(this).attr('class').replace("line-numbers", ""));
                pre.attr('class', pre.attr('class') + ' ' + "line-numbers");

            } 
            // Process data-start
            if ($(this).attr('class').indexOf("data-start=") >= 0) {
                idx_start = $(this).attr('class').indexOf("data-start=") + 11;
                idx_end = $(this).attr('class').indexOf(" ",idx_start);
                if (idx_end == -1) {
                    idx_end = $(this).attr('class').length;
                }
                start = $(this).attr('class').substring(idx_start, idx_end); 
                if (isNumber(start)) {
                    pre.attr('data-start', start);
                }
            }
            // Process data-start
            if ($(this).attr('class').indexOf("data-start=") >= 0) {
                idx_start = $(this).attr('class').indexOf("data-start=") + 11;
                idx_end = $(this).attr('class').indexOf(" ",idx_start);
                if (idx_end == -1) {
                    idx_end = $(this).attr('class').length;
                }
                start = $(this).attr('class').substring(idx_start, idx_end); 
                if (isNumber(start)) {
                    pre.attr('data-start', start);
                }
            }
            // Process data-line
            if ($(this).attr('class').indexOf("data-line=") >= 0) {
                idx_start = $(this).attr('class').indexOf("data-line=") + 10;
                idx_end = $(this).attr('class').indexOf(" ",idx_start);
                if (idx_end == -1) {
                    idx_end = $(this).attr('class').length;
                }
                lines = $(this).attr('class').substring(idx_start, idx_end); 
                pre.attr('data-line', lines);
            }
            // Process data-line-offset
            if ($(this).attr('class').indexOf("data-line-offset=") >= 0) {
                idx_start = $(this).attr('class').indexOf("data-line-offset=") + 17;
                idx_end = $(this).attr('class').indexOf(" ",idx_start);
                if (idx_end == -1) {
                    idx_end = $(this).attr('class').length;
                }
                offset = $(this).attr('class').substring(idx_start, idx_end); 
                if (isNumber(start)) {
                    pre.attr('data-line-offset', offset);
                }
            }
        });
    };
}
prism_markdown()
