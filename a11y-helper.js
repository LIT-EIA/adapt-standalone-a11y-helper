console.log('a11y-helper is running');

var mcss = '#marauderMap{display:block;position:fixed;top:50%;left:40%;background-color:#69459C;color:white;padding:2em;font-weight:bold;}  #marauderMap li{list-style:none; text-indent: -2.3em;text-decoration:underline;cursor:pointer}';
$('head').append('<style>' + mcss + '</style>');
$('body').append('<div id="marauderMap"></div>');

marauderMenu();

function marauderMenu() {
    var options = ['stats', 'sensory highlighter', 'nbsp highlighter', 'trickle bypass', 'open accordions', 'verify accordion count', 'links highlighter', 'lists highlighter'];
    var lis = options.map(function(item) {
        return ('<li>' + item + '</li>');
    });
    $('#marauderMap').empty().append('<ul></ul>');
    for (let li of lis) {
        $('#marauderMap').find('ul').append(li);
    }

    $('#marauderMap').find('li').on('click', function() {
        var selection = $(this).text();
        console.log(options)
        switch (selection) {
            case options[0]:
                console.log(gatherStats());
                $('#marauderMap').remove();
                break;
            case options[1]:
                console.log(sensoryHighlighter());
                $('#marauderMap').remove();
                break;
            case options[2]:
                console.log(nbspHighlighter());
                $('#marauderMap').remove();
                break;
            case options[3]:
                console.log(trickleBypass());
                $('#marauderMap').remove();
                break;
            case options[4]:
                console.log(openAccordion());
                $('#marauderMap').remove();
                break;
            case options[5]:
                console.log(verifyAccordion());
                $('#marauderMap').remove();
                break;
            case options[6]:
                console.log(linksHighlighter());
                $('#marauderMap').remove();
                break;
            case options[7]:
                console.log(listsHighlighter());
                $('#marauderMap').remove();
                break;
        }
    });
}

function listsHighlighter(){
    // SCRIPT FOR HIGHLIGHTING VALID LISTS IN ADAPT PAGE
    // COPY AND PASTE TO YOUR BROWSER CONSOLE

    var css = 'highlight ul { border: #17d717 5px solid;; cursor: pointer; transition: all 0.5s} highlight:hover { background: #ff000094 } .exit-highlight { width: 25%; background: #69459C; position: fixed; bottom: 0; left: 0; z-index: 9999; }  .keep-open { display: block!important; } .highlight-menu li { padding-left: 2em;text-indent: -1em;margin: 0;padding-bottom: 5px;padding-top: 5px;}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
    } else {
    style.appendChild(document.createTextNode(css));
    };

    function replaceForHighlighted(){
    $('.accordion-item-body, .media-inline-transcript-body-container').addClass('keep-open');
    $('.highlight-menu li').remove();
    var count_unit = 1;
    $('.accordion-item-body').addClass('keep-open');
    $(".block-title-inner ul, .block-title-inner ol, .component-instruction-inner ul, .component-instruction-inner ol, .component-body-inner ul, .component-body-inner ol, .component-inner ul, .component-inner ol, .notify-popup-inner ul, .notify-popup-inner ol").each(function(i, text) {
        console.log(text);
        var opening_tag = ' <highlight id="' + 'list' + count_unit + '">';
        this.outerHTML = opening_tag + this.outerHTML + '</highlight>';
    count_unit++;
    });
    }

    replaceForHighlighted();


    $('title').on('DOMSubtreeModified', function(){
    replaceForHighlighted();
    });

    function scrollInPage(id){
    $('body').scrollTo(id);
    }
}

function linksHighlighter(){
    // SCRIPT FOR HIGHLIGHTING LINKS IN ADAPT PAGE
    // COPY AND PASTE TO YOUR BROWSER CONSOLE

    var css = 'highlight { padding: 0px 5px; line-height: 175%; font-size: 130%; font-weight: bold; border: red 3px solid; cursor: pointer; transition: all 0.5s} highlight:hover { background: #ff000094 } .exit-highlight { width: 25%; background: #69459C; position: fixed; bottom: 0; left: 0; z-index: 9999; } body.notranslate { width: 75%!important; margin-left: 25%; } .highlight-menu {background: #c3c3c3; width: 25%; position: absolute; height: 100%; left: 0; top: 0; box-shadow: 0 14px 28px rgb(0 0 0 / 15%), 0 10px 10px rgb(0 0 0 / 15%); } .keep-open { display: block!important; } .highlight-menu li { padding-left: 2em;text-indent: -1em;margin: 0;padding-bottom: 5px;padding-top: 5px;} .highlight-menu ul, .highlight-menu li { list-style-type: none; } .highlight-menu li:hover {background: #69459C;cursor: pointer;}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
    } else {
    style.appendChild(document.createTextNode(css));
    };

    var exit_button = document.createElement('button');
    exit_button.setAttribute('class', 'exit-highlight');
    exit_button.innerHTML = 'Exit Highlighter';
    document.body.append(exit_button)

    $('.exit-highlight').on('click', function(){
    location.reload();
    });

    var menu = document.createElement('div');
    menu.setAttribute('class', 'highlight-menu');
    var ul = document.createElement('ul');
    menu.append(ul);
    document.body.append(menu);

    function replaceForHighlighted(){
    $('.highlight-menu li').remove();
    var count_unit = 1;
    $('.accordion-item-body').addClass('keep-open');
    $(".block-title-inner a, .component-instruction-inner a, .component-body-inner a").each(function(i, text) {
        console.log(text);
        var opening_tag = ' <highlight id="' + 'link' + count_unit + '">';
        this.outerHTML = opening_tag + this.outerHTML + '</highlight>';
    count_unit++;
    });
    var pos_list = [];
    $('.highlight-menu ul').empty();
    $('highlight').each(function(){
    console.log(this.id);
    var link = document.createElement('a');
    link.innerHTML = this.id;
    var height = $('#' + this.id)[0].parentNode.scrollHeight
    var li = document.createElement('li');
    li.setAttribute('tag-id', this.id);
    li.setAttribute('onclick', 'scrollInPage(' + this.id + ')');
    li.append(link);
    $('.highlight-menu ul').append(li);
    
    console.log(height);
    if(pos_list.indexOf(height) !== -1 && height !== 0) {
        console.log(height + ' exists');
    } else if(height === 0) {
        pos_list.push(height);
    } else {
        console.log(height + ' doesnt exist, creating..');
        pos_list.push(height);
    }
    })
    $("highlight").dblclick(function(){
    var id = this.id;
    var word = this.innerHTML;
    var text = document.createTextNode(word);
    this.parentNode.insertBefore(text, this.nextSibling);
    this.remove();
    var menu_item = $('li[tag-id="' + this.id + '"]')[0];
    menu_item.remove();
    });
    }

    replaceForHighlighted();


    $('title').on('DOMSubtreeModified', function(){
    replaceForHighlighted();
    });

    function scrollInPage(id){
    $('body').scrollTo(id);
    }
}

function gatherStats(){
        // SCRIPT FOR COUNTING INTERACTIVE COMPONENTS IN ADAPT PAGE
    // COPY AND PASTE TO YOUR BROWSER CONSOLE

    var css = 'highlight { padding: 0px 5px; line-height: 175%; font-size: 130%; font-weight: bold; border: red 3px solid; cursor: pointer; transition: all 0.5s} highlight:hover { background: #ff000094 } .next-button { width: 25%; height: 50px; background: #69459C; position: fixed; bottom: 0; left: 0; z-index: 9999; } .auto-button { width: 25%; background: #69459C; position: fixed; bottom: 55px; left: 0; z-index: 9999; } body.notranslate { width: 75%!important; margin-left: 25%; } .control-menu {background: #c3c3c3; width: 25%; position: absolute; height: 100%; left: 0; top: 0; box-shadow: 0 14px 28px rgb(0 0 0 / 15%), 0 10px 10px rgb(0 0 0 / 15%); } .keep-open { display: block!important; } .control-menu li { padding-left: 2em;text-indent: -1em;margin: 0;padding-bottom: 5px;padding-top: 5px;} .control-menu ul, .control-menu li { list-style-type: none; } .control-menu li:hover {background: #69459C;cursor: pointer;} .drawer-components { float: left; } .drawer-components-button button:hover { background: none; } .drawer-components-button button { background: none; } .menu-h2 { text-align: center; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
    } else {
    style.appendChild(document.createTextNode(css));
    };


    var menu = document.createElement('div');
    menu.setAttribute('class', 'control-menu');
    var ul = document.createElement('ul');
    menu.append(ul);
    document.body.append(menu);

    var component_list = [];

    var auto = false;

    var total_components = {
    narrative: 0,
    accordion: 0,
    question: 0,
    media: 0,
    hotgraphic: 0,
    hotgrid: 0,
    graphic: 0,
    text: 0
    }

    function calculateTotalStats(){
    $('.next-button').remove();
    $('.auto-button').remove();
    $('.control-menu ul').empty();
    var title = document.createElement('h2');
    title.innerHTML = 'You are on the last page';
    title.classList.add('menu-h2');
    $('.control-menu ul').append(title);
    Object.entries(total_components).forEach(object => {
        var link = document.createElement('a');
        link.innerHTML = object[1] + ' ' + object[0] + ' components';
        var li = document.createElement('li');
        li.append(link);
        $('.control-menu ul').append(li);
    })
    var title2 = document.createElement('h2');
    title2.innerHTML = 'Total Stats';
    title2.classList.add('menu-h2');
    $('.control-menu ul').append(title2);
    var static = total_components.text + total_components.graphic;
    var text_img = document.createTextNode(`Text & Images: ${static}`);
    var text_img_span = document.createElement('p');
    text_img_span.append(text_img)
    $('.control-menu ul').append(text_img_span);
    var interactive = total_components.narrative + total_components.accordion + total_components.question + total_components.media + total_components.hotgraphic;
    var interactive_components = document.createTextNode(`Interactive: ${interactive}`);
    var interactive_span = document.createElement('p');
    interactive_span.append(interactive_components)
    $('.control-menu ul').append(interactive_span);
    var total = static + interactive;
    var tot_components = document.createTextNode(`Total: ${total}`);
    var tot_span = document.createElement('p');
    tot_span.append(tot_components)
    $('.control-menu ul').append(tot_span);
    }

    function runAuto(){
    $('button[data-type="_next"]').click();
    }

    function runAutoMode(){
    auto = true;
    runAuto();
    }

    function countComponents(){
    var next_button = document.createElement('button');
    next_button.setAttribute('class', 'next-button');
    next_button.innerHTML = 'Next';
    document.body.append(next_button)

    $('.next-button').on('click', function(){
        $('button[data-type="_next"]').click()
    });

    var auto_button = document.createElement('button');
    auto_button.setAttribute('class', 'auto-button');
    auto_button.innerHTML = 'Auto-Mode';
    document.body.append(auto_button)

    $('.auto-button').on('click', function(){
        runAutoMode();
    });


    $('.control-menu ul').empty();

    var components = [
        { name: 'narrative', class: 'narrative-component', count: $('.narrative-component').length },
        { name: 'accordion', class: 'accordion-component', count: $('.accordion-component').length },
        { name: 'question', class: 'question-component', count: $('.question-component').length },
        { name: 'media', class: 'media-component', count: $('.media-component').length },
        { name: 'hotgraphic', class: 'hotgraphic-component', count: $('.hotgraphic-component').length },
        { name: 'hotgrid', class: 'hotgrid-component', count: $('.hotgrid-component').length },
        { name: 'graphic', class: 'graphic-component', count: $('.graphic-component').length },
        { name: 'text', class: 'text-component', count: $('.text-component').length }
    ];
    components.forEach(component => {
        total_components[component.name] = total_components[component.name] + component.count;
        var link = document.createElement('a');
        link.innerHTML = component.count + ' ' + component.name + ' components';
        var li = document.createElement('li');
        li.append(link);
        $('.control-menu ul').append(li);
    })

    if(!$('button[data-type="_next"]')[0]){
        calculateTotalStats();
    }
    }

    countComponents();


    $('title').on('DOMSubtreeModified', function(){
    countComponents();
    if(auto && $('button[data-type="_next"]')[0]){
        runAuto();
    }
    });


    var htmlobserver = new MutationObserver(observehtml);
    var headerobserver = new MutationObserver(observeheaders);
    var initialPageLoadingFlag = true;

    //Set properties that trigger htmlobserver
    function setObservers() {
    htmlobserver.disconnect();
    var observerOptions = { attributes: true, attributeFilter: ['class', 'data-location', 'style'] };
    var object_htmlTag = document.documentElement;
    var object_Spinner = $('.loading')[0];
    var object_htmlTag2 = document.getElementsByClassName('drawer')[0];
    htmlobserver.observe(object_htmlTag, observerOptions);
    htmlobserver.observe(object_Spinner, observerOptions);
    htmlobserver.observe(object_htmlTag2, observerOptions);
    }

    setObservers();

    function managePopup(name){
    if(name === 'Page Incomplete' || 'Page incomplete' || 'page incomplete'){
        $('button[data-event="pageIncompletePrompt:leavePage"]').click();
    }
    }


    function IsPopup() {
    if ($('.notify-popup').length > 0 || $('.drawer').not('.display-none').length > 0) {
        var popup_title = $('.notify-popup').find('#notify-heading')[0].children[0].innerText;
        managePopup(popup_title);
        return true;
    } else {
        return false;
    }
    }


    function observehtml(mutations) {
    for (let mutation of mutations) {
        if (mutation.type == 'attributes') {
            if (mutation.attributeName == 'class') {
                IsPopup();
            }
        }
    }
    }


}

function sensoryHighlighter() {
    var terms_to_check = ['up', 'down', 'left', 'right', 'top', 'bottom', 'click here', 'more info', 'above', 'below', 'blue', 'red', 'yellow', 'image', 'highlight', 'highlighted', 'learn more', 'link'];

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };


    var css = 'highlight { padding: 0px 5px; line-height: 175%; font-size: 130%; font-weight: bold; border: red 3px solid; cursor: pointer; transition: all 0.5s} highlight:hover { background: #ff000094 } .exit-highlight { width: 25%; background: #69459C; position: fixed; bottom: 0; left: 0; z-index: 9999; } body.notranslate { width: 75%!important; margin-left: 25%; } .highlight-menu {background: #c3c3c3; width: 25%; position: absolute; height: 100%; left: 0; top: 0; box-shadow: 0 14px 28px rgb(0 0 0 / 15%), 0 10px 10px rgb(0 0 0 / 15%); } .keep-open { display: block!important; } .highlight-menu li { padding-left: 2em;text-indent: -1em;margin: 0;padding-bottom: 5px;padding-top: 5px;} .highlight-menu ul, .highlight-menu li { list-style-type: none; } .highlight-menu li:hover {background: #69459C;cursor: pointer;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    };

    var exit_button = document.createElement('button');
    exit_button.setAttribute('class', 'exit-highlight');
    exit_button.innerHTML = 'Exit Sensory Highlighter';
    document.body.append(exit_button)

    $('.exit-highlight').on('click', function() {
        location.reload();
    });

    var menu = document.createElement('div');
    menu.setAttribute('class', 'highlight-menu');
    var ul = document.createElement('ul');
    menu.append(ul);
    document.body.append(menu);

    var count_diz = 0;
    var count_unit = 0;

    function replaceForHighlighted() {
        $('.accordion-item-body').addClass('keep-open');
        $("p, .block-title-inner, .component-instruction-inner, .component-body-inner").each(function(i, text) {
            var inside = this.innerHTML;
            terms_to_check.forEach(term => {
                var capitalized_term = term.charAt(0).toUpperCase() + term.substr(1).toLowerCase();
                var opening_tag = ' <highlight id="' + 'sensory' + count_diz + count_unit + '">';
                inside = inside.replace(' ' + term, opening_tag + term + '</highlight>').replace(' ' + capitalized_term, opening_tag + capitalized_term + '</highlight>');
                inside = inside.replaceAll(' ' + term, '<highlight>' + term + '</highlight>').replaceAll(' ' + capitalized_term, '<highlight>' + capitalized_term + '</highlight>');
                count_unit++;
            })
            this.innerHTML = inside;
            count_diz++;
        });

        var pos_list = [];
        $('.highlight-menu ul').empty();
        $('highlight').each(function() {
            var link = document.createElement('a');
            link.innerHTML = this.innerHTML;
            var height = this.parentNode.scrollHeight
            var li = document.createElement('li');
            li.setAttribute('tag-id', this.id);
            li.setAttribute('onclick', 'scrollInPage(' + this.id + ')');
            li.append(link);
            $('.highlight-menu ul').append(li);
            if (pos_list.indexOf(height) !== -1 && height !== 0) {} else if (height === 0) {
                pos_list.push(height);
            } else {
                pos_list.push(height);
            }
        })

        $("highlight").dblclick(function() {
            var id = this.id;
            var word = this.innerHTML;
            var text = document.createTextNode(word);
            this.parentNode.insertBefore(text, this.nextSibling);
            this.remove();
            var menu_item = $('li[tag-id="' + this.id + '"]')[0];
            menu_item.remove();
        });
    }

    replaceForHighlighted();

    $('title').on('DOMSubtreeModified', function() {
        replaceForHighlighted();
    });
}

function nbspHighlighter() {
    var css = 'highlight { padding: 0px 5px; line-height: 175%; font-size: 130%; font-weight: bold; border: red 3px solid; cursor: pointer; transition: all 0.5s} highlight:hover { background: #ff000094 } .exit-highlight { width: 25%; background: #69459C; position: fixed; bottom: 0; left: 0; z-index: 9999; } body.notranslate { width: 75%!important; margin-left: 25%; } .highlight-menu {background: #c3c3c3; width: 25%; position: absolute; height: 100%; left: 0; top: 0; box-shadow: 0 14px 28px rgb(0 0 0 / 15%), 0 10px 10px rgb(0 0 0 / 15%); } .keep-open { display: block!important; } .highlight-menu li { padding-left: 2em;text-indent: -1em;margin: 0;padding-bottom: 5px;padding-top: 5px;} .highlight-menu ul, .highlight-menu li { list-style-type: none; } .highlight-menu li:hover {background: #69459C;cursor: pointer;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    };

    var exit_button = document.createElement('button');
    exit_button.setAttribute('class', 'exit-highlight');
    exit_button.innerHTML = 'Exit Highlighter';
    document.body.append(exit_button)

    $('.exit-highlight').on('click', function() {
        location.reload();
    });

    var menu = document.createElement('div');
    menu.setAttribute('class', 'highlight-menu');
    var ul = document.createElement('ul');
    menu.append(ul);
    document.body.append(menu);

    var count_unit = 0;

    function replaceForHighlighted() {
        $('.accordion-item-body').addClass('keep-open');
        $("p, .block-title-inner, .component-instruction-inner, .component-body-inner").each(function(i, text) {
            if (this.firstChild) {
                if (this.firstChild.nodeValue == String.fromCharCode(160)) {
                    var opening_tag = ' <highlight id="' + 'nbsp' + count_unit + '">';
                    this.innerHTML = opening_tag + '&nbsp;' + '</highlight>';
                }
            }
            count_unit++;
        });
        var pos_list = [];
        $('.highlight-menu ul').empty();
        $('highlight').each(function() {
            console.log(this.id);
            var link = document.createElement('a');
            link.innerHTML = 'nbsp;';
            var height = $('#' + this.id)[0].parentNode.scrollHeight
            var li = document.createElement('li');
            li.setAttribute('tag-id', this.id);
            li.setAttribute('onclick', 'scrollInPage(' + this.id + ')');
            li.append(link);
            $('.highlight-menu ul').append(li);

            console.log(height);
            if (pos_list.indexOf(height) !== -1 && height !== 0) {
                console.log(height + ' exists');
            } else if (height === 0) {
                pos_list.push(height);
            } else {
                console.log(height + ' doesnt exist, creating..');
                pos_list.push(height);
            }
        })
        $("highlight").dblclick(function() {
            var id = this.id;
            var word = this.innerHTML;
            var text = document.createTextNode(word);
            this.parentNode.insertBefore(text, this.nextSibling);
            this.remove();
            var menu_item = $('li[tag-id="' + this.id + '"]')[0];
            menu_item.remove();
        });
    }

    replaceForHighlighted();


    $('title').on('DOMSubtreeModified', function() {
        replaceForHighlighted();
    });
}

function trickleBypass() {
    var trickle_buttons = $('.trickle-button-component .trickle-button-inner button');
    var loop_length = trickle_buttons.length;
    var loop_count = 0;
    trickle_buttons.each(function() {
        loop_count++;
        $(this).removeAttr('disabled');
        this.click();
        if (loop_count === loop_length) {
            trickleDone();
        }
    })

    function trickleDone() {
        console.log('All trickle clicked');
        setTimeout(function() {
            $('body').scrollTo(0);
        }, 3000)
    }
}

function openAccordion() {
    var css = '.keep-open { display: block!important; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    };

    function openAccordions() {
        $('.accordion-item-body').addClass('keep-open');
    }

    openAccordions();

    $('title').on('DOMSubtreeModified', function() {
        openAccordions();
    });
}

function verifyAccordion() {
    var css = 'highlight { padding: 0px 5px; line-height: 175%; font-size: 130%; font-weight: bold; border: red 3px solid; cursor: pointer; transition: all 0.5s} highlight:hover { background: #ff000094 } .exit-highlight { width: 25%; background: #69459C; position: fixed; bottom: 0; left: 0; z-index: 9999; } body.notranslate { width: 75%!important; margin-left: 25%; } .highlight-menu {background: #c3c3c3; width: 25%; position: absolute; height: 100%; left: 0; top: 0; box-shadow: 0 14px 28px rgb(0 0 0 / 15%), 0 10px 10px rgb(0 0 0 / 15%); } .keep-open { display: block!important; } .highlight-menu li { padding-left: 2em;text-indent: -1em;margin: 0;padding-bottom: 5px;padding-top: 5px;} .highlight-menu ul, .highlight-menu li { list-style-type: none; } .highlight-menu li:hover {background: #69459C;cursor: pointer;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    };

    var exit_button = document.createElement('button');
    exit_button.setAttribute('class', 'exit-highlight');
    exit_button.innerHTML = 'Exit Accordion Checker';
    document.body.append(exit_button)

    $('.exit-highlight').on('click', function() {
        location.reload();
    });

    var menu = document.createElement('div');
    menu.setAttribute('class', 'highlight-menu');
    var ul = document.createElement('ul');
    menu.append(ul);
    document.body.append(menu);

    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }

    function replaceForHighlighted() {
        var count_limit = 0;
        var count_duplicate = 0;
        var count_compliant = 0;
        $('.highlight-menu ul').empty();
        $('.accordion-widget').each(function(i, element) {
            if (element.children.length > 8) {
                count_limit++;
            }
            var titles_array = [];
            Array.from(element.children).forEach(function(data) {
                titles_array.push(data.children[0].children[0].innerText);
            });
            if (hasDuplicates(titles_array)) {
                count_duplicate++;
            }
            if (element.children.length <= 8 && hasDuplicates(titles_array) === false) {
                count_compliant++;
            }
        })
        var link_1 = document.createElement('a');
        link_1.innerHTML = count_compliant + ' compliant accordions';
        var li_1 = document.createElement('li');
        li_1.append(link_1);
        $('.highlight-menu ul').append(li_1);
        var link_2 = document.createElement('a');
        link_2.innerHTML = count_limit + ' accordions over limit';
        var li_2 = document.createElement('li');
        li_2.append(link_2);
        $('.highlight-menu ul').append(li_2);
        var link_3 = document.createElement('a');
        link_3.innerHTML = count_duplicate + ' accordions with non-unique titles';
        var li_3 = document.createElement('li');
        li_3.append(link_3);
        $('.highlight-menu ul').append(li_3);
    }

    replaceForHighlighted();

    $('title').on('DOMSubtreeModified', function() {
        replaceForHighlighted();
    });


}

function scrollInPage(id) {
    $('body').scrollTo(id);
}
