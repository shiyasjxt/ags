!(function($) {
    // regular js
    /*  function formatDate(myDate) {
          var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          var myDay = "<span class='rss-item-pubDate-date'>" + myDate.getUTCDate() + "</span> ";
          var myMonth = "<span class='rss-item-pubDate-month'>" + monthList[myDate.getUTCMonth()] + "</span> ";
          var myYear = "<span class='rss-item-pubDate-full-year'>" + myDate.getUTCFullYear() + "</span> ";

          return myDay + "<br>" + myMonth;
      }*/
    function formatDate(pubDate) {
        var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dateObj = '';
        var myDay, myMonth, myYear, mnth;
        dateObj = pubDate.trim().split('/');
        if (dateObj.length > 2) {
            mnth = monthList[parseInt(dateObj[1]) - 1];
            myDay = "<span class='rss-item-pubDate-date'>" + dateObj[0] + "</span> ";
            myMonth = "<span class='rss-item-pubDate-month'>" + mnth + "</span> ";
            myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2].substr(0, 4) + "</span> ";
        } else {
            return pubDate.trim();
        }
        return myDay + myMonth;
    }
    // jquery
    $(function() {
        $('link[href="http://images.jxt.net.au/COMMON/newdash/lib/bootstrap.min.css"]').remove();
        if ($('#site-topnav .user-loggedIn').length) {
            $('a#HiddenMemLog').prop("href", "/member/default.aspx").text('My Dashboard');
        }
        var currentPage = window.location.pathname.toLowerCase();
        // remove empty li's on the system pages. 
        $("#side-left li:empty").remove();
        // remove empty left side bar
        if ($('#prefix_left-navigation').children().length == 0) {
            $('#prefix_left-navigation').remove();
        }
        if ($('#side-left').children().length == 0) {
            $('#side-left').remove();
        }
        /* Adding Bootstrap Classes */
        // Section > Div.container
        $('#dynamic-container, #content-container, #job-dynamic-container').addClass('container');
        // Content column
        if ($.trim($('#dynamic-side-left-container, #side-left').html()).length) {
            $('#dynamic-content, #content-container #content').addClass('col-sm-8 col-md-9');
            $('#dynamic-side-left-container, #side-left').addClass('col-sm-4 col-md-3');
        } else {
            $('#dynamic-content, #content-container #content').addClass('col-xs-12');
            $('#dynamic-side-left-container, #side-left').addClass("hidden");
        }
        $('#job-dynamic-container #content').addClass('col-xs-12');
        $('#ctl00_ContentPlaceHolder1_Label4').text('City');
        $('#ctl00_ContentPlaceHolder1_updatePanel1 h2').text('Favorite Searches / Job Alerts');
        $('#memberProfileAlerts a').text('Favorite Searches / Job Alerts');
        // form elements style
        $('input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=reset]):not([type=file]):not([type=image]):not([type=date]), select, textarea').addClass('form-control');
        $('input[type=text]').addClass('form-control');
        $('input[type=submit]').addClass('btn btn-primary');
        $('.mini-new-buttons').addClass('btn btn-primary');
        $('input[type=reset]').addClass('btn btn-default');
        // Responsive table
        $('.dynamic-content-holder table, .content-holder table').addClass('table table-bordered').wrap('<div class="table-responsive"></div>');
        // Convert top menu to Boostrap Responsive menu
        $('.navbar .navbar-collapse > ul').addClass('nav navbar-nav');
        $('.navbar .navbar-collapse > ul > li').has('ul').addClass('dropdown');
        $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        $('.navbar .navbar-collapse > ul > li.dropdown').append('<a id="child-menu"></a>');
        $('.navbar .navbar-collapse > ul > li.dropdown > a#child-menu').append('<b class="caret"></b>').attr('data-toggle', 'dropdown').addClass('dropdown-toggle');
        $('.navbar .navbar-collapse > ul > li > ul').addClass('dropdown-menu');
        // add placeholder for search widget text field
        $('#keywords1').attr('placeholder', 'Keywords search');
        $('.site-search #keywords1').attr('placeholder', 'SEARCH');
        // add active class to links.
        $("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");
        $("li li.active").parent().parent().addClass("active")
            // add last-child class to navigation 
        $("#prefix_navigation > ul > li:last").addClass("last-child");
        // add btn style
        $(".backtoresults a").addClass("btn btn-default");
        $(".apply-now-link a").addClass("btn btn-primary");
        $(".button a").addClass("btn btn-default");
        //.left-hidden show
        if ((document.URL.indexOf("/advancedsearch.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/advancedsearch.aspx?") >= 0)) {
            $(".left-hidden").css("display", "none");
        }
        if ((document.URL.indexOf("/member/createjobalert.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/member/login.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/member/register.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        // Contact - Google map
        $("#footer").prepend($("#contact-map"));
        // generate select navigation from sidebar Dynamic menu
        $("#dynamic-content").convertNavigation({
            title: "Related Pages",
            links: "#site-topnav .navbar-nav li.active a:not([data-toggle=dropdown])"
        });
        // generate actions button on Job Listing page
        $(".job-navbtns").convertButtons({
            buttonTitle: "Actions&hellip;",
            title: "Please choose&hellip;",
            links: ".job-navbtns a"
        });
        // generate filters button on Job Listing page
        $(".job-navbtns").convertFilters({
            buttonTitle: "Filters&hellip;",
            filteredTitle: "Applied Filters",
            title: "Please choose&hellip;",
            filtered: ".search-query p",
            list: "ul#side-drop-menu",
            excludeFromList: "#AdvancedSearchFilter_PnlCompany"
        });
        /* System Page Forms */
        if (currentPage == "/member/createjobalert.aspx") {
            setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder1$ucJobAlert1$ddlProfession\',\'\')', 0);
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function() {
                $('.alternate > li > select, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryLowerBand, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryUpperBand').addClass('form-control');
                $('#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlRole, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlLocation, #ctl00_ContentPlaceHolder1_ucJobAlert1_lstBoxArea, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary').addClass('form-control');
            });
        }
        $(document).ajaxComplete(function() {
            $('#divRoleID1 > select, #divAreaDropDown1 > div > select').addClass('form-control');
            $('#divRoleID > select, #divAreaDropDown > div > select').addClass('form-control');
        });
        $('#salaryID').change(function() {
            $(document).ajaxComplete(function() {
                $('#divSalaryFrom > input').addClass('form-control');
                $('#divSalaryTo > input').addClass('form-control');
            });
        });

        function SalaryFromChange1() {
            $(document).ajaxComplete(function() {
                $('#divSalaryTo1 > input').addClass('form-control');
                $('#divSalaryFrom1 > input').addClass('form-control');
            });
        }
        if (currentPage == "/member/register.aspx") {
            $(".uniForm").addClass("border-container");
        }
        if (currentPage == "/member/createjobalert.aspx") {
            $(".uniForm").addClass("border-container");
        }
    });
    // Resize action
    /*$(window).on('resize', function() {

        var wi = $(this).width();

        // Mobile & Tablet
        if ( wi <= 992 ) {
            //$('#dynamic-side-left-container').before($('#dynamic-content'));
            //$('#side-left').before($('#content'));            
            $('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
        }
        //  Desktop
        else {
            //$('#dynamic-side-left-container').after($('#dynamic-content'));
            //$('#side-left').after($('#content'));
            $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        } 

    });*/
    $(document).ready(function() {
        /*// Resize action
        var $window = $(window);
            // Function to handle changes to style classes based on window width
            function checkWidth() {
            if ($window.width() < 992) {
                $('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');   
                }
        }
            // Execute on load
            checkWidth();           
            // Bind event listener
            $(window).resize(checkWidth);*/
        // Latest Jobs widget
        $('.statistics').counterUp({
            delay: 10, // the delay time in ms
            time: 1000 // the speed time in ms
        })


        $("#myJobsList ul").each(function() {
            var dataURL = $(this).attr("data-url");
        $(this).includeFeed({
            baseSettings: {
                rssURL: [dataURL || "/job/rss.aspx?search=1"],
                limit: 200
            },
            predicates: {
                // example predicate use
                pubDate: function(pubDate) {
                    var monthList = ["Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var dateObj = '';
                    var myDay, myMonth, myYear, mnth;
                    dateObj = pubDate.trim().split('/');
                    if (dateObj.length > 2) {
                        mnth = monthList[parseInt(dateObj[0]) - 1];
                        myDay = "<span class='rss-item-pubDate-date'>" + dateObj[1] + "</span> ";
                        myMonth = "<span class='rss-item-pubDate-month'>" + mnth + "</span> ";
                        myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2].substr(0, 4) + "</span> ";
                    } else {
                        return pubDate.trim();
                    }
                    return myDay + myMonth;
                }
            },
            elements: {
                pubDate: formatDate,
                title: 1,
                description: 1
            },
            complete: function() {
                if ($(this).children().length) {

               
                $(this).owlCarousel({
                    loop: true,
                    autoplay: true,
                    nav: true,
                    dots: false,
                    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                    responsive: {
                        0: {
                            items: 1,
                            margin: 0
                        },
                        768: {
                            items: 1,
                            margin: 15
                        },
                        991: {
                            items: 2,
                        }
                    }
                })
            }
            else{
                $('.section-jobfeed').hide();
            }
        }
        });
    });
        //home testimonial
        $(".testimonial").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/NewsRSS.aspx"],
                    limit: 200
                },
                elements: {
                    title: 1,
                    description: 1
                },
                templates: {
                    itemTemplate: "<div class='testimonial-content'>{{description}}<span class='testimonial-title'>- {{title}}</span></div>"
                },
                predicates: {
                    pubDate: formatDate,
                },
                complete: function() {
                    if ($(this).children().length > 1) {
                        $(this).owlCarousel({
                            loop: true,
                            autoplay: true,
                            nav: true,
                            dots: true,
                            autoplaySpeed: 4000,
                            /*autoHeight: true,*/
                            responsive: {
                                0: {
                                    items: 1,
                                    margin: 0
                                }
                            }
                        })
                    }
                }
            });
        });
        //insight
        $(".insight-list .flex-container").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/NewsRSS.aspx?category=insight"],
                    limit: 200
                },
                elements: {
                    title: 1,
                    description: 1
                },
                templates: {
                    itemTemplate: "<div class='col-sm-4 flex-items'><a href='{{link}}' class='insight-block'>{{title}}<span><i class='fa fa-pencil-square-o'><!-- --></i></span><span class='description'>{{description}}</span></a></div>"
                },
                predicates: {
                    pubDate: formatDate,
                },
                complete: function() {
                    setTabsAnimation('.container-large .flex-container', '.flex-items', '.load-more', '.insight-list', 6, 0);
                }
            });
        });
        //back to top
        $(".footer-scroll a").click(function(e) {
            e.preventDefault();
            $("html, body").stop().animate({
                scrollTop: 0
            }, 1000);
        });
        //full width container
        if ($(".full-width").length > 0) {
            $("body").addClass('full-width-container');
        }

        if ($("#jobsearch-top").length > 0) {
            $('.inner-banner .inner-title').wrapInner('<h1>Explore Opportunities</h1>')
        }
        // inner banners
        var pageTitle = window.location.pathname.replace("/", "");
        if (pageTitle != "") {
            $("body").addClass(pageTitle);
        }
        //append h1
        $('.dynamic-content-holder:first h1').appendTo('.inner-title');
        $('#content .content-holder:first h1').appendTo('.inner-title');
        $('#content .border-container:first h1').appendTo('.inner-title');
        $('.inner-submenu').appendTo('.inner-banner');
        $('.leadership-bulb').appendTo('.inner-title');


        //change resume creator link
        $('.icongrid3 a').attr('href','/member/register.aspx');
        //scroll
        $('form[action="/"] a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                var h = document.getElementById('Top-nav-sticky');
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - h.offsetHeight
                    }, 1000);
                    return false;
                }
            }
        });
        if ('ontouchstart' in window) {
            $(".practice-contact .row> [class*=col-]").click(function() {
                $(this).addClass("hover");
            });
            $('body').on('click touchstart', function(e) {
                if ($(e.target).closest(".practice-contact").length == 0) {
                    $(".practice-contact .row> [class*=col-]").removeClass("hover");
                }
            });
        } else {
            $(".practice-contact .row> [class*=col-]").hover(function() {
                $(this).addClass("hover");
            }, function() {
                $(this).removeClass("hover");
            })
        }
        //industry team
        /* $(".industry-testimonial").each(function() {
             var dataURL = $(this).attr("data-url");
             $(this).includeFeed({
                 baseSettings: {
                     rssURL: [dataURL || "/ConsultantsRSS.aspx?featured=0"],
                     limit: 1,
                     addNBSP: false,
                     repeatTag: "consultant"
                 },
                 templates: {
                     itemTemplate: '<div class="flex-container"><div class="col-sm-6 no-gutter industry-left"><div class="industry-teamimage"><a href="/t/{{FriendlyURL}}" style="background-image:url({{ImageURL}})" title="{{FirstName}} {{LastName}}"></a></div></div><div class="col-sm-6 no-gutter industry-right col-sm-offset-6"><div class="industry-teamcont"><div class="desc-text">{{Testimonial}}</div><h3>{{FirstName}} {{LastName}}<span><em>{{PositionTitle}}</em></span></h3></div></div></div>'
                 },
                 complete: function() {
                     // Callback
                 }
             });
         });*/
        //teamlist 
        $(".myteamlist ul").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/ConsultantsRSS.aspx"],
                    limit: 200,
                    addNBSP: false,
                    repeatTag: "consultant"
                },
                templates: {
                    itemTemplate: '<li><div class="team-block"><div class="team-image" style="background-image:url({{ImageURL}})"></div><div class="team-content" style="background-image:url({{Link}})"><a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}"><span class="team-name">{{FirstName}} {{LastName}}</span><span class="team-position">{{PositionTitle}}</span><span class="service-title">{{Categories}}</span></a></div></div></li>'
                },
                complete: function() {
                    if ($(this).children().length > 1) {
                        /* hide profile item for active profile - starts here */
                        var txt;
                        if (window.location.search) {
                            txt = window.location.search.split("consultantname=")[1]
                        } else {
                            txt = $("form").attr("action").split("/t/")[1]
                        }
                        $("a[href='/t/" + txt + "']").closest("li").remove();
                        /* hide profile item for active profile - ends here */
                        var mylist = $(this);
                        var listitems = mylist.find('> li').get();
                        listitems.sort(function(a, b) {
                            var compA = $(a).find('.team-name').text().toUpperCase().trim();
                            var compB = $(b).find('.team-name').text().toUpperCase().trim();
                            return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
                        })
                        $.each(listitems, function(idx, itm) {
                            mylist.append(itm);
                        });
                        var item = $(this);
                        item.find('.rssLocation').append(item.find('.xmlLocation').html());
                        var childElem = $(this).children();
                        var $this = $(this);
                        childElem.each(function(index, el) {
                            if (index % 2 == 0) {
                                $(".jobs-li").removeClass('jobs-li');
                                $this.append("<li class='jobs-li'></li>");
                            }
                            $(".jobs-li").append($(el));
                        });
                        $(this).owlCarousel({
                            items: 4,
                            loop: true,
                            nav: true,
                            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                            margin: 0,
                            responsive: {
                                0: {
                                    items: 1
                                },
                                768: {
                                    items: 2
                                },
                                1200: {
                                    items: 4
                                },
                            },
                            //  onTranslated: callback
                        });
                        // Callback
                    }
                }
            });
        });

        //meet team no slider
        $(".myTeamlist ul").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/ConsultantsRSS.aspx"],
                    limit: 200,
                    addNBSP: false,
                    repeatTag: "consultant"
                },
                templates: {
                    itemTemplate: '<li class="col-lg-3 col-md-4 col-sm-4 col-xs-6"><div class="team-block"><div class="team-image" style="background-image:url({{ImageURL}})"></div><div class="team-content" style="background-image:url({{Link}})"><a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}"><span class="team-name">{{FirstName}} {{LastName}}</span><span class="team-position">{{PositionTitle}}</span><span class="service-title">{{Location}}</span></a></div></div></li>'
                },
                complete: function() {

                    // Callback
                    $(".myTeamlist ul").prepend('<li class="empty-div col-lg-3 col-md-4 col-sm-4 col-xs-6"><div class="team-block"><div class="team-image firstchild" style="background-image:url(/media/site/ags/images/profile-placeholder.jpg)"></div><div class="team-content" style="background-image:url(/media/site/ags/images/profile-placeholder.jpg)"><div class="blue" ><span class="team-name">Picture Yourself Here</span></div></div></div></li>');
                }

            });
        });

        //image-slider
        $('.image-slider').owlCarousel({
            loop: true,
            autoplay: true,
            nav: true,
            dots: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                1199: {
                    items: 1,
                    margin: 0
                }
            }
        })
        $('.favourite-search-button a').text('Favorite this search');
        //popup video
        $('.play-btn, youtube-popup').magnificPopup({
            disableOn: 0,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            overflowY: 'auto',
            removalDelay: 300,
            midClick: true,
            fixedBgPos: true,
            fixedContentPos: true
        });
        // Equal Height 
        $.fn.eqHeights = function(options) {
            var defaults = {
                child: false
            };
            var options = $.extend(defaults, options);
            var el = $(this);
            if (el.length > 0 && !el.data('eqHeights')) {
                $(window).bind('resize.eqHeights', function() {
                    el.eqHeights();
                });
                el.data('eqHeights', true);
            }
            if (options.child && options.child.length > 0) {
                var elmtns = $(options.child, this);
            } else {
                var elmtns = $(this).children();
            }
            var prevTop = 0;
            var max_height = 0;
            var elements = [];
            elmtns.height('auto').each(function() {
                var thisTop = this.offsetTop;
                if (prevTop > 0 && prevTop != thisTop) {
                    $(elements).height(max_height);
                    max_height = $(this).height();
                    elements = [];
                }
                max_height = Math.max(max_height, $(this).height());
                prevTop = this.offsetTop;
                elements.push(this);
            });
            $(elements).height(max_height);
        };
        // Equal Height - Usage
        $('.service-holder').eqHeights();
        /*$('.block-media').eqHeights();*/
        // if there is a hash, scroll down to it. Sticky header covers up top of content.
        if ($(window.location.hash).length) {
            $("html, body").animate({
                scrollTop: $(window.location.hash).offset().top - $(".navbar-wrapper").height() - 40
            }, 100);
        }
        // contact page stop scrolling until clicked.
        $(".r27_map-overlay").click(function() {
            $(this).hide();
        });
        //leadership team
        $(".leadership-team").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/ConsultantsRSS.aspx"],
                    limit: 200,
                    addNBSP: false,
                    repeatTag: "consultant"
                },
                templates: {
                    itemTemplate: '<div class="no-gutter col-lg-3 col-md-4 col-sm-4 col-xs-6"><div class="team-profile leader-wrap"><a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}" class="leader-image lead-image" style="background-image:url({{ImageURL}})"><a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}" class="leader-image leader-hover" style="background-image:url({{Link}})"></a></div><div class="team-detail"><h3>{{FirstName}} {{LastName}}</h3><h4><em>{{PositionTitle}}</em></h4><h5>{{Location}}</h5></div></div>'
                },
                complete: function() {
                    if ($(this).children().length > 1) {
                        var item = $(this);
                        item.find('.rssLocation').append(item.find('.xmlLocation').html());
                        var childElem = $(this).children();
                        var $this = $(this);
                        childElem.each(function(index, el) {
                            if (index % 2 == 0) {
                                $(".jobs-li").removeClass('jobs-li');
                                $this.append("<li class='jobs-li'></li>");
                            }
                            $(".jobs-li").append($(el));
                        });
                        /* hide profile item for active profile - starts here */
                        var txt;
                        if (window.location.search) {
                            txt = window.location.search.split("consultantname=")[1]
                        } else {
                            txt = $("form").attr("action").split("/t/")[1]
                        }
                        $("a[href='/t/" + txt + "']").closest("li").remove();
                        /* hide profile item for active profile - ends here */
                        /* $(this).owlCarousel({
                             items: 4,
                             loop: true,
                             nav: false,
                             autoplay: true,
                             margin: 0,
                             responsive: {
                                 0: {
                                     items: 1
                                 },
                                 768: {
                                     items: 2
                                 },
                                 1200: {
                                     items: 4
                                 },
                             },
                             //  onTranslated: callback
                         });*/
                        // Callback
                    }
                    /*var item = $(this);
                    item.find('.rssLocation').append(item.find('.xmlLocation').html());
                    var childElem = $(this).children();
                    var $this = $(this);
                    childElem.each(function(index, el) {
                        if (index % 2 == 0) {
                            $(".jobs-li").removeClass('jobs-li');
                            $this.append("<li class='jobs-li'></li>");
                        }
                        $(".jobs-li").append($(el));
                    });*/
                }
            });
        });
        //team list 
        $(".team-list").each(function() {
                var dataURL = $(this).attr("data-url");
                $(this).includeFeed({
                    baseSettings: {
                        rssURL: [dataURL || "/ConsultantsRSS.aspx"],
                        limit: 200,
                        addNBSP: false,
                        repeatTag: "consultant"
                    },
                    templates: {
                        itemTemplate: '<div class="team-block"><div class="team-image" style="background-image:url({{ImageURL}})"></div><div class="team-content" style="background-image:url({{Link}})"><a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}"><span class="team-name">{{FirstName}} {{LastName}}</span><span class="team-position">{{PositionTitle}}</span></a></div></div>'
                    },
                    complete: function() {
                        if ($(this).children().length > 1) {
                            var item = $(this);
                            item.find('.rssLocation').append(item.find('.xmlLocation').html());
                            var childElem = $(this).children();
                            var $this = $(this);
                            childElem.each(function(index, el) {
                                if (index % 2 == 0) {
                                    $(".jobs-li").removeClass('jobs-li');
                                    $this.append("<li class='jobs-li'></li>");
                                }
                                $(".jobs-li").append($(el));
                            });
                            /* hide profile item for active profile - starts here */
                            var txt;
                            if (window.location.search) {
                                txt = window.location.search.split("consultantname=")[1]
                            } else {
                                txt = $("form").attr("action").split("/t/")[1]
                            }
                            $("a[href='/t/" + txt + "']").closest("li").remove();
                            /* hide profile item for active profile - ends here */
                            $(this).owlCarousel({
                                items: 4,
                                loop: true,
                                nav: true,
                                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                                margin: 0,
                                responsive: {
                                    0: {
                                        items: 1
                                    },
                                    768: {
                                        items: 2
                                    },
                                    1200: {
                                        items: 3
                                    },
                                },
                                //  onTranslated: callback
                            });
                            // Callback
                        }
                    }
                });
            })
            //team job


            $(".team-joblist ul").each(function() {
                var dataURL = $(this).attr("data-url");
        $(this).includeFeed({
            baseSettings: {
                rssURL: [dataURL || "/job/rss.aspx?search=1"]
            },
            predicates: {
                // example predicate use
                pubDate: function(pubDate) {
                    var monthList = ["Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var dateObj = '';
                    var myDay, myMonth, myYear, mnth;
                    dateObj = pubDate.trim().split('/');
                    if (dateObj.length > 2) {
                        mnth = monthList[parseInt(dateObj[1]) - 1];
                        myDay = "<span class='rss-item-pubDate-date'>" + dateObj[0] + "</span> ";
                        myMonth = "<span class='rss-item-pubDate-month'>" + mnth + "</span> ";
                        myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2].substr(0, 4) + "</span> ";
                    } else {
                        return pubDate.trim();
                    }
                    return myDay + myMonth;
                }
            },
            elements: {
                pubDate: formatDate,
                title: 1,
                description: 1
            },
            complete: function() {
                /* if ($(this).children().length > 2) {
                     $(this).simplyScroll({
                         frameRate: 60
                     });
                 }*/
                $(this).bxSlider({
                    infiniteLoop: true,
                    slideMargin: 40,
                    speed: 500,
                    minSlides: 2,
                    maxSlides: 2,
                    mode: 'vertical',
                    controls: true,
                    nextText: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
                    prevText: '<i class="fa fa-angle-left" aria-hidden="true"></i>'
                });
            }
        });
    });
        /*File upload buttons*/
        $("#item8_file_1").on('change', function() {
            document.getElementById("attached-resume").value = this.value;
        });
        //change banner image
        var link = $('.inner-banner-image').attr("style");
        $('.inner-banner').attr("style", link);


        $('#prefix_left-navigation-static ul li ul li:last-child a').attr("href","http://www.alliedeoffice.com/global/php/employee-login.php");

          $('#ctl00_ContentPlaceHolder1_pnlFullRegistration #Label7').text('Industry');
        $('#ctl00_ContentPlaceHolder1_pnlFullRegistration #Label8').text('sub-industry');
        $('#ctl00_ContentPlaceHolder1_ddlClassification option[value="0"]').text('- All Industry');
        $('#ddlSubClassification option[value="0"]').text('- - Select a Sub Industry');
//         //change text in register page
         $('#ctl00_ContentPlaceHolder1_updatePanel1').change(function() {
         $('#ctl00_ContentPlaceHolder1_pnlFullRegistration #Label8').html('sub-industry');
          $('#ddlSubClassification option:first').html('- - Select a Sub Industry');
         $('#ddlSubClassification option[value="0"]').html('- - Select a Sub Industry');
         $('#ctl00_ContentPlaceHolder1_pnlFullRegistration #Label7').html('Industry');
         $('#ctl00_ContentPlaceHolder1_ddlClassification option[value="0"]').html('- All Industry');
        

    });


         $('body').on('change', 'select#ctl00_ContentPlaceHolder1_ddlClassification', function(){
           if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
               setTimeout( function(){
                   $('label[for*="ddlClassification"]').text('Industry');
                          $('#ctl00_ContentPlaceHolder1_pnlFullRegistration #Label8').text('sub-industry');
        $('#ctl00_ContentPlaceHolder1_ddlClassification option[value="0"]').text('- All Industry');
        $('#ddlSubClassification option[value="0"]').text('- - Select a Sub Industry');

               },199);
           }

       });


// $("select #ctl00_ContentPlaceHolder1_ddlClassification").change(function() {
//       $('#ctl00_ContentPlaceHolder1_pnlFullRegistration #Label7').text('Industry');
//         $('#ctl00_ContentPlaceHolder1_pnlFullRegistration #Label8').text('sub-industry');
//         $('#ctl00_ContentPlaceHolder1_ddlClassification option[value="0"]').text('- All Industry');
//         $('#ddlSubClassification option[value="0"]').text('- - Select a Sub Industry');
//     });






        // $('#ctl00_ContentPlaceHolder1_pnlFullRegistration #Label8').text('sub-industry');

        // $("select").change(function() {
        //     $('#ctl00_ContentPlaceHolder1_pnlFullRegistration #Label7').val('Industry');
        //     $('#ctl00_ContentPlaceHolder1_pnlFullRegistration #Label8').val('sub-industry');
        //     $('#ctl00_ContentPlaceHolder1_ddlClassification option[value="0"]').val('- All Industry');
        //     $('#ddlSubClassification option[value="0"]').val('- - Select a Sub Industry');
        // 
      
        $(".member-status-register").text('Subscribe');

        //news page full width
        if ($('.jxt-news-container').length > 0) {
            $('body').addClass('news-full-container');
        }
        if ($('#advanced_search-holder').length > 0) {
            $('.inner-title h1').text('Explore Opportunities');
        }
        if ($('#advanced_search-holder').length > 0) {
            $('body').addClass('advanced-search');
        }
        /* if ($('.sec-media').length > 0) {
             $('.inner-title h1').text("What's happening at Allied");
         }*/
        // $(".jxt-news-item-title").prepend("<span class='title-top'>Update</span>");
        $(".jxt-news-item-title").prepend("<span class='subscribe-link'><a href='#' class='' title='Subscribe to Content'>Subscribe to Content</a></span>");
        //team individual page
        if ($('.team-single').length > 0) {
            $('body').addClass('team-individual');
        }
        if ($('.jxt-single-item').length > 0) {
            $('body').removeClass('news-full-container');
        }
        if ($('#job-ad-template').length > 0) {
            $('body').addClass('job-templete');
            $('.inner-banner').hide();
        }

        //case studies
        $(".case-studies").owlCarousel({
                loop: true,
                autoplay: true,
                nav: true,
                dots: false,
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    }
                }
            })
            //social responsibility 
        $(".social-responsibitliy .brand-logo").owlCarousel({
            loop: true,
            autoplay: true,
            nav: false,
            dots: false,
            /*navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],*/
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                992: {
                    items: 6
                },
                1200: {
                    items: 8,
                    margin: 0
                }
            }
        })
        $("#widget-search .form-textbox").keypress(function(e) {
            if (e.which == 13) {
                $(this).closest(".container").find("#btn-widget-search").click()
            }
        });
        //media carousel
        /* if ($('.sec-media .h-qlinks').children().length > 4) {*/
        $('.sec-media .h-qlinks').owlCarousel({
            // items: 4,
            loop: true,
            margin: 20,
            nav: false,
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                992: {
                    items: 4
                }
            }
        });
        /* custom anchor href */
        $(".consultant-link a").each(function(ind, elem) {
            var str = $(elem).text();
            if (str.trim() != "") {
                $(elem).attr("href","//"+window.location.host + "/t/" + str.trim().toLowerCase().split(" ").join("-"));
            }
        });
    })
})(jQuery);

function setTabsAnimation(activeList, activeListChild, loadMore, parent, num, flag) {
    if (flag == 0) {
        $("body").on('click', parent + ' ' + loadMore, function(e) {
            e.preventDefault();
            $(parent).find(activeList).find('.team-animate').slice(0, num).removeClass('team-animate');
            if ($(parent).find(activeList).find('.team-animate').length <= 0) {
                $(parent + ' ' + loadMore).hide();
            }
        });
        // $("body").on('click', parent + ' [data-toggle]', function(event) {
        //     event.preventDefault();
        //     setCountOfItems(activeList, activeListChild, loadMore, parent, num);
        // });
    }
    setCountOfItems(activeList, activeListChild, loadMore, parent, num);
}

function setCountOfItems(activeList, activeListChild, loadMore, parent, num) {
    setTimeout(function() {
        $(activeList).find(activeListChild).slice(num, $(activeList).find(activeListChild).length).addClass('team-animate');
        if ($(activeList).find(activeListChild + ".team-animate").length > 0) {
            $(parent + ' ' + loadMore).show();
        } else {
            $(parent + ' ' + loadMore).hide();
        }
    }, 500);
}

function CustomFunction(){
   
}