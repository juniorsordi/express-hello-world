app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});
///#####################################################################################################
app.directive('watchChange', function() {
    return {
        scope: {
            onchange: '&watchChange'
        },
        link: function(scope, element, attrs) {
            element.on('input', function() {
                scope.onchange();
            });
        }
    };
});
///#####################################################################################################
app.directive('select2', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).select2({
                placeholder: 'Escolha uma opção'
            });
        }
    }
});
///#####################################################################################################
app.directive('editable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).editable({
                type: 'text',
                pk: 1,
                url: 'app/rest/?Modulo=Projetos&metodo=teste1&sc=2',
                title: 'Enter username'
            });
        }
    }
});
///#####################################################################################################
app.directive('editable2', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).editable({
                type: 'select',
                pk: 1,
                url: 'app/rest/?Modulo=Projetos&metodo=teste1&sc=2',
                title: 'Enter username',
                source: attrs.source
            });
        }
    }
});
///#####################################################################################################
app.directive('datepicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).datepicker({
                uiLibrary: 'bootstrap5',
                locale: 'pt-br',
                language: 'pt-br',
                format: 'dd/mm/yyyy'
            });
        }
    }
});
///#####################################################################################################
app.directive('flatpickr', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            flatpickr(element, { dateFormat: 'd/m/Y', locale: 'pt', altInput: false, allowInput: true }); // flatpickr
        }
    }
});
///#####################################################################################################
app.directive('choices', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var choices = new Choices(element, {
                searchEnabled: true,
                maxItemCount: -1,
                allowHTML: true,
                placeholder: true,
                choices: attrs.options
            });/*.setChoices(attrs.options, 'id',
                'nome',
                false,);
                //*/
        }
    }
});
///#####################################################################################################
app.directive('flatpickr2', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).flatpickr({
                locale: "pt",
                dateFormat: "d/m/Y",
            });
        }
    }
});
///#####################################################################################################
app.directive('bs3datepicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).datepicker({
                dateFormat: 'dd-mm-yyyy',
                language: "pt-BR",
                pickTime: false,
                todayBtn: true,
                todayHighlight: true,
                autoclose: true
            }).on('changeDate', function (e) {
                //var temp = new Date(e.date);
                //ngModelCtrl.$setViewValue(temp.toLocaleDateString());
                //scope.$apply();
            });
        }
    }
});
///#####################################################################################################
app.directive('testedata', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs['ngModel'], function (v) {
                console.log('value changed, new value is: ' + v.toLocaleDateString());
                attrs['ngModel'] = v.toLocaleDateString();
            });
        }
    }
});//
///#####################################################################################################
app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                onSelect: function (date) {
                    console.log(date);
                    scope.date = date;
                    scope.$apply();
                }
            });
        }
    };
});
///#####################################################################################################
app.directive("ngDatepicker", ["$document", function (a) { var b = function (d, c) { d.format = c.format || "YYYY-MM-DD"; d.viewFormat = c.viewFormat || "Do MMMM YYYY"; d.locale = c.locale || "en"; d.firstWeekDaySunday = d.$eval(c.firstWeekDaySunday) || false; d.placeholder = c.placeholder || "" }; return { restrict: "EA", require: "?ngModel", scope: {}, link: function (g, e, d, j) { b(g, d); g.calendarOpened = false; g.days = []; g.dayNames = []; g.viewValue = null; g.dateValue = null; moment.locale(g.locale); var c = moment(); var f = function (l) { var k = l.endOf("month").date(), q = l.month(), p = l.year(), r = 1; var o = g.firstWeekDaySunday === true ? l.set("date", 2).day() : l.set("date", 1).day(); if (o !== 1) { r -= o - 1 } g.dateValue = l.format("MMMM YYYY"); g.days = []; for (var m = r; m <= k; m += 1) { if (m > 0) { g.days.push({ day: m, month: q + 1, year: p, enabled: true }) } else { g.days.push({ day: null, month: null, year: null, enabled: false }) } } }; var h = function () { var k = g.firstWeekDaySunday === true ? moment("2015-06-07") : moment("2015-06-01"); for (var l = 0; l < 7; l += 1) { g.dayNames.push(k.format("ddd")); k.add("1", "d") } }; h(); g.showCalendar = function () { g.calendarOpened = true; f(c) }; g.closeCalendar = function () { g.calendarOpened = false }; g.prevYear = function () { c.subtract(1, "Y"); f(c) }; g.prevMonth = function () { c.subtract(1, "M"); f(c) }; g.nextMonth = function () { c.add(1, "M"); f(c) }; g.nextYear = function () { c.add(1, "Y"); f(c) }; g.selectDate = function (m, k) { m.preventDefault(); var l = moment(k.day + "." + k.month + "." + k.year, "DD.MM.YYYY"); j.$setViewValue(l.format(g.format)); g.viewValue = l.format(g.viewFormat); g.closeCalendar() }; var i = ["ng-datepicker", "ng-datepicker-input"]; if (d.id !== undefined) { i.push(d.id) } a.on("click", function (m) { if (!g.calendarOpened) { return } var l = 0, k; if (!m.target) { return } for (k = m.target; k; k = k.parentNode) { var o = k.id; var n = k.className; if (o !== undefined) { for (l = 0; l < i.length; l += 1) { if (o.indexOf(i[l]) > -1 || n.indexOf(i[l]) > -1) { return } } } } g.closeCalendar(); g.$apply() }); j.$render = function () { var k = j.$viewValue; if (k !== undefined) { g.viewValue = moment(k).format(d.viewFormat); g.dateValue = k } } }, template: '<div><input type="text" ng-focus="showCalendar()" ng-value="viewValue" class="ng-datepicker-input" placeholder="{{ placeholder }}"></div><div class="ng-datepicker" ng-show="calendarOpened">  <div class="controls">    <div class="left">      <i class="fa fa-backward prev-year-btn" ng-click="prevYear()"></i>      <i class="fa fa-angle-left prev-month-btn" ng-click="prevMonth()"></i>    </div>    <span class="date" ng-bind="dateValue"></span>    <div class="right">      <i class="fa fa-angle-right next-month-btn" ng-click="nextMonth()"></i>      <i class="fa fa-forward next-year-btn" ng-click="nextYear()"></i>    </div>  </div>  <div class="day-names">    <span ng-repeat="dn in dayNames">      <span>{{ dn }}</span>    </span>  </div>  <div class="calendar">    <span ng-repeat="d in days">      <span class="day" ng-click="selectDate($event, d)" ng-class="{disabled: !d.enabled}">{{ d.day }}</span>    </span>  </div></div>' } }]);
///#####################################################################################################
app.directive('datetimepicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).datetimepicker();
        }
    }
});
///#####################################################################################################
app.directive('togglePassword', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            console.log(attrs.field);
            var temp = document.getElementById(attrs.field);
            if (temp.type === "password") {
                temp.type = "text";
            } else {
                temp.type = "password";
            }
        }
    }
});
///#####################################################################################################
app.directive('summernote2', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var options = {
                dialogsInBody: false,
                height: 200
            };
            attrs.$observe('height', function (value) {
                if (value) {
                    options = {
                        height: value
                    }
                }
            });
            $(element).summernote(options);
        }
    }
});
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
app.directive('chartContainer', function () {
    return {
        restrict: 'E', // Element directive
        scope: {
            chartContainer: '=chartContainerData'
        },
        template: '<div id = {{chartContainer.id}} style="height: 360px; width: 100%;"></div>'
    };
});
///#####################################################################################################
///################################################################################
app.directive('barraprogresso', function() {
    return {
        restrict: "E",
        transclude: true,
        scope: {
            progresso: '@'
        },
        template: '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="{{ progresso }}" aria-valuemin="0" aria-valuemax="100" style="width: {{ progresso }}%;"><span class="sr-only"></span><span style="color: {{ (progresso > 50 ? \'white\' : \'black\') }};">{{ progresso }}%</span></div></div>',
        link: function(scope, element, attrs) {
            progresso = attrs['progresso'];
        },
        replace: true,
    }
});
///#####################################################################################################
app.directive('modalDialog', function () {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function (scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.hideModal = function () {
                scope.show = false;
            };
        },
        template: '...' // See below
    };
});
///#####################################################################################################
app.factory('$ocModal', ['$rootScope', '$controller', '$location', '$timeout', '$compile', '$sniffer', function ($rootScope, $controller, $location, $timeout, $compile, $sniffer) {
    var $body = angular.element(document.body),
        $dialogsWrapper = angular.element('<div role="dialog" tabindex="-1" class="modal"><div class="modal-backdrop"></div></div>'),
        $modalWrapper = angular.element(
            '<div class="modal-wrapper"></div>'
        ),
        modals = {},
        openedModals = [],
        baseOverflow;

    // include the modal in DOM at start for animations
    $modalWrapper.css('display', 'none');
    $modalWrapper.append($dialogsWrapper);
    $body.append($modalWrapper);
    var $backdrop = $dialogsWrapper.children()[0];
    $dialogsWrapper.on('click.modal', function (e) {
        if (e.target === $backdrop) { // only if clicked on backdrop
            $rootScope.$apply(function () {
                self.closeOnEsc();
            });
        }
        e.stopPropagation();
    });

    var parseMaxTime = function parseMaxTime(str) {
        var total = 0, values = angular.isString(str) ? str.split(/\s*,\s*/) : [];
        angular.forEach(values, function (value) {
            total = Math.max(parseFloat(value) || 0, total);
        });
        return total;
    }

    var getAnimDuration = function getDuration($element) {
        var duration = 0;
        if (($sniffer.transitions || $sniffer.animations)) {
            //one day all browsers will have these properties
            var w3cAnimationProp = 'animation';
            var w3cTransitionProp = 'transition';

            //but some still use vendor-prefixed styles
            var vendorAnimationProp = $sniffer.vendorPrefix + 'Animation';
            var vendorTransitionProp = $sniffer.vendorPrefix + 'Transition';

            var durationKey = 'Duration',
                delayKey = 'Delay',
                animationIterationCountKey = 'IterationCount';

            //we want all the styles defined before and after
            var ELEMENT_NODE = 1;
            angular.forEach($element, function (element) {
                if (element.nodeType == ELEMENT_NODE) {
                    var elementStyles = window.getComputedStyle(element) || {};

                    var transitionDelay = Math.max(parseMaxTime(elementStyles[w3cTransitionProp + delayKey]),
                        parseMaxTime(elementStyles[vendorTransitionProp + delayKey]));

                    var animationDelay = Math.max(parseMaxTime(elementStyles[w3cAnimationProp + delayKey]),
                        parseMaxTime(elementStyles[vendorAnimationProp + delayKey]));

                    var transitionDuration = Math.max(parseMaxTime(elementStyles[w3cTransitionProp + durationKey]),
                        parseMaxTime(elementStyles[vendorTransitionProp + durationKey]));

                    var animationDuration = Math.max(parseMaxTime(elementStyles[w3cAnimationProp + durationKey]),
                        parseMaxTime(elementStyles[vendorAnimationProp + durationKey]));

                    if (animationDuration > 0) {
                        animationDuration *= Math.max(parseInt(elementStyles[w3cAnimationProp + animationIterationCountKey]) || 0,
                            parseInt(elementStyles[vendorAnimationProp + animationIterationCountKey]) || 0, 1);
                    }

                    duration = Math.max(animationDelay + animationDuration, transitionDelay + transitionDuration, duration);
                }
            });
        }

        return duration * 1000;
    }

    angular.element(document).on('keyup', function (e) {
        if (e.keyCode == 27 && openedModals.length > 0) {
            e.stopPropagation();
            $rootScope.$apply(function () {
                self.closeOnEsc(openedModals[openedModals.length - 1]);
            });
        }
    });

    var self = {
        waitingForOpen: false,

        getOpenedModals: function () {
            return openedModals;
        },

        register: function (params) {
            modals[params.id || '_default'] = params;
        },

        remove: function (id) {
            delete modals[id || '_default'];
        },

        open: function (opt) {
            if (typeof opt === 'string') {
                if (opt.match('<')) { // if html code
                    opt = {
                        template: opt
                    }
                } else {
                    opt = {
                        url: opt
                    }
                }
            }
            var modal = modals[opt.id || '_default'];
            if (!modal) {
                $dialogsWrapper.append($compile('<div oc-modal="' + (opt.id ? opt.id : '_default') + '"></div>')($rootScope));
                $timeout(function () { // let the ng-include detect that it's now empty
                    self.open(opt);
                });
                return;
            } else if (modal && openedModals.indexOf(opt.id || '_default') !== -1) { // if modal already opened
                self.waitingForOpen = true;
                self.close(opt.id);
                $timeout(function () { // let the ng-include detect that it's now empty
                    self.open(opt);
                });
                return;
            }
            // ok let's open the modal
            if (!self.waitingForOpen) {
                if (openedModals.length === 0) { // if no modal opened
                    baseOverflow = document.body.style.overflow;
                    document.body.style.overflow = 'hidden';
                    $modalWrapper.css('display', 'block');
                } else {
                    for (var i = 0, len = openedModals.length; i < len; i++) {
                        var $e = modals[openedModals[i]].$element;
                        modals[openedModals[i]].baseZIndex = $e.css('z-index');
                        $e.css('z-index', '-1');
                    }
                }
            }
            self.waitingForOpen = false;
            openedModals.push(opt.id || '_default');
            modal.params = opt;
            modal.$scope.customClass = modal.params.cls;

            // timeout for animations (if any)
            $rootScope.$digest();
            $body[0].offsetWidth; // force paint to be sure the element is in the page
            $timeout(function () {
                modal.$scope.modalShow = true;
            }, 100);

            if (typeof modal.params.onOpen === 'function') {
                modal.params.onOpen();
            }

            var off = modal.$scope.$on('$includeContentLoaded', function (event) { // on view load
                if (modal.params.init && !modal.params.isolate) {
                    angular.extend(event.targetScope, modal.params.init, true);
                }
                if (typeof modal.params.controller === 'string') {
                    $controller(modal.params.controller, { $scope: event.targetScope, $init: modal.params.init, $ocModalParams: modal.params }); // inject controller
                }
                off();
            });

            if (modal.params.template) {
                modal.$scope.modalTemplate = modal.params.template; // load the view
            } else if (modal.params.url) {
                modal.$scope.modalUrl = modal.params.url; // load the view
            } else {
                throw "You need to define a template or an url";
                return;
            }

            if (typeof callback === 'function') {
                modal.$scope.callbacksList.push(callback);
            }
        },

        closeOnEsc: function (id) {
            if (modals[id || openedModals[openedModals.length - 1]].params.closeOnEsc !== false) {
                self.close(id);
            }
        },

        close: function (id) {
            var args;
            if (typeof id === 'string' && openedModals.indexOf(id) !== -1) {
                args = Array.prototype.slice.call(arguments, 1);
            } else {
                args = arguments;
            }
            if (typeof id === 'undefined' || openedModals.indexOf(id) === -1) {
                id = openedModals[openedModals.length - 1];
            }
            var modal = modals[id || openedModals[openedModals.length - 1]];
            if (modal && modal.$scope.modalShow === true) { // if the modal is opened
                var animDuration = getAnimDuration(angular.element(modal.$element[0].querySelector('.modal-content')));
                $timeout(function () {
                    modal.$scope.modalShow = false;

                    $timeout(function () {
                        modal.$element.remove(); // destroy the modal
                    }, animDuration);
                });

                modal.callbacksList = []; // forget all callbacks
                openedModals.splice(openedModals.indexOf(id || openedModals[openedModals.length - 1]), 1);
                if (openedModals.length === 0) { // if no modal left opened
                    $timeout(function () {
                        if (!self.waitingForOpen) { // in case the current modal is closed because another opened with the same id (avoid backdrop flickering in firefox)
                            document.body.style.overflow = baseOverflow; // restore the body overflow
                            $modalWrapper.css('display', 'none');
                        }
                    }, animDuration);
                } else {
                    var topModal = modals[openedModals[openedModals.length - 1]];
                    topModal.$element.css('z-index', topModal.baseZIndex);
                }
                if (typeof modal.params.onClose === 'function') {
                    modal.params.onClose.apply(undefined, args);
                }
            }
        }
    };

    return self;
}]);
///#####################################################################################################
app.directive('ocModal', ['$ocModal', '$compile', '$timeout', function ($ocModal, $compile, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        scope: true,
        template:
            '<div class="modal-dialog">' +
            '<div class="modal-content {{customClass}}" ng-class="{opened: modalShow}" ng-if="modalTemplate"></div>' +
            '<div class="modal-content {{customClass}}" ng-class="{opened: modalShow}" ng-include="modalUrl"></div>' +
            '</div>',

        link: function link($scope, $element, $attrs) {
            var dialog = $element.find('[role=dialog]'),
                id = $attrs.ocModal,
                $templateWrapper;

            $scope.closeModal = function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(id);
                $ocModal.close.apply(undefined, args);
            };

            $ocModal.register({
                id: id,
                $scope: $scope,
                $element: $element
            });

            $element.on('$destroy', function () {
                $ocModal.remove(id);
            });

            $scope.$watch('modalTemplate', function (newVal, oldVal) {
                if (typeof newVal !== 'undefined') {
                    if (!$templateWrapper) {
                        $templateWrapper = angular.element($element.children()[0]);
                    }
                    $templateWrapper.append($compile(newVal)($scope));
                    $scope.$emit('$includeContentLoaded');
                }
            });
        }
    }
}]);
///#####################################################################################################
app.directive('ocModalOpen', ['$ocModal', function ($ocModal) {
    return {
        restrict: 'A',
        require: '?modal',
        link: function ($scope, $element, $attrs) {
            $element.on('click touchstart', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var newScope = $scope.$new();
                var params = newScope.$eval($attrs.ocModalOpen);
                if (params) {
                    if (typeof params === "number") {
                        params = { url: $attrs.ocModalOpen };
                    } else if (typeof params === "string") {
                        params = { url: params };
                    }
                    if (!params.url) {
                        throw "You need to set the modal url";
                    }
                    $scope.$apply(function () {
                        $ocModal.open(params);
                    });
                }
            });
        }
    };
}]);
///#####################################################################################################
app.directive('ocModalClose', ['$ocModal', function ($ocModal) {
    return {
        restrict: 'A',
        require: '?modal',
        link: function ($scope, $element, $attrs) {
            $element.on('click touchstart', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $scope.$apply(function () {
                    if ($attrs.ocModalClose) {
                        var params = $scope.$new().$eval($attrs.ocModalClose);
                    }
                    $ocModal.close(params);
                });
            });
        }
    };
}]);
///#####################################################################################################
///#####################################################################################################
app.directive('kanbanBoardDragg', function () {
    return {
        link: function ($scope, element, attrs) {

            var dragData = "";
            $scope.$watch(attrs.kanbanBoardDragg, function (newValue) {
                dragData = newValue;
            });

            element.bind('dragstart', function (event) {
                event.originalEvent.dataTransfer.setData("Text", JSON.stringify(dragData));
            });
        }
    };
});
///#####################################################################################################
app.directive('kanbanBoardDrop', function () {
    return {
        link: function ($scope, element, attrs) {

            var dragOverClass = attrs.kanbanBoardDrop;

            //  Prevent the default behavior. This has to be called in order for drob to work
            cancel = function (event) {
                if (event.preventDefault) {
                    event.preventDefault();
                }

                if (event.stopPropigation) {
                    event.stopPropigation();
                }
                return false;
            };

            element.bind('dragover', function (event) {
                cancel(event);
                event.originalEvent.dataTransfer.dropEffect = 'move';
                element.addClass(dragOverClass);
            });

            element.bind('drop', function (event) {
                cancel(event);
                element.removeClass(dragOverClass);
                var droppedData = JSON.parse(event.originalEvent.dataTransfer.getData('Text'));
                $scope.onDrop(droppedData, element.attr('id'));

            });

            element.bind('dragleave', function (event) {
                element.removeClass(dragOverClass);
            });
        }
    };
});
///#####################################################################################################
app.directive('selectize2', function () {
    return {
        scope: {
            selectize: '<',
        },
        link: function (scope, el) {
            var selectize = $(el).selectize(scope.selectize);
        },
    };
});
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
