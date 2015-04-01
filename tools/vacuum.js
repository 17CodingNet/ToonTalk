 /**
 * Implements ToonTalk's vacuum for removing and erasing widgets
 * Authors: Ken Kahn
 * License: New BSD
 */

/*jslint browser: true, devel: true, plusplus: true, vars: true, white: true */

window.TOONTALK.vacuum = (function (TT) {
    "use strict";

    var vacuum = Object.create(null);
  
    var titles = {suck:     "Drag this vacuum over the thing you want to remove.\nType 'e' to switch to erasing, type 'r' to swich to restoring, or 'a' for removing all.\nOr click to switch modes.",
                  erase:    "Drag this vacuum over the thing you want to erase (or un-erase).\nType 's' to switch to sucking, type 'r' to switch to restoring, or 'a' for removing all.\nOr click to switch modes.",
                  restore:  "Drag this over the work area. Each time you release it a widget is restored.\nType 's' to switch to sucking, type 'e' to swich to erasing, or 'a' for removing all.\nOr click to switch modes.",
                  suck_all: "Drag this over the work area and click. Everything will be removed.\nType 'r' to switch to restoring, type 'e' to switch to erasing, or type 's' to switch to sucking.\nOr click to switch modes."};

    var mode_classes = {suck:     "toontalk-vacuum-s",
                        erase:    "toontalk-vacuum-e",
                        restore:  "toontalk-vacuum-r",
                        suck_all: "toontalk-vacuum-a"};

    var next_mode    = {suck:     'erase',
                        erase:    'restore',
                        restore:  'suck_all',
                        suck_all: 'suck'};

    vacuum.create = function () {
        var element, mode_class;
        var mode; // mode is either 'suck', 'erase', 'restore', or 'suck_all'
        var removed_items = [];

        var set_mode = function (new_value) {
            if (mode !== new_value) {
                mode = new_value;
                $(element).removeClass(mode_class);
                mode_class = mode_classes[mode];
                $(element).addClass(mode_class);
                update_title();
            }
        };

        var get_next_mode = function () {
            return next_mode[mode];
        };

        var update_title = function () {
            if (mode === 'restore' && removed_items.length === 0) {
                TT.UTILITIES.give_tooltip(element, "The vacuum is empty.\nType 's' to switch to sucking, or type 'e' to switch to erasing, or 'a' to remove all.");
            } else {
                TT.UTILITIES.give_tooltip(element, titles[mode]);
            }
        };

        return {
            apply_tool: function (widget_side, event) {
                var remove_widget = function (widget_side) {
                    var copy;
                    if (widget_side.is_backside()) {
                        widget_side.hide_backside();
                        return;
                    }
                    if (TT.robot.in_training && event) {
                        TT.robot.in_training.removed(widget_side);
                    }
                    if (widget_side === TT.robot.in_training) {
                        // vacuuming himself so automatically finish training
                        widget_side.training_finished();
                        widget_side.set_run_once(true); // since removes itself can iterate
                        return;
                    }
                    // save a copy for restoring since the following clobbers the original -- e.g. removing contents from boxes
                    copy = widget_side.copy();
                    copy.save_dimensions_of(widget_side);
                    removed_items.push(copy);
                    if (widget_side.set_running) {
                        widget_side.set_running(false);
                    }
                    widget_side.remove(event);
                };
                var restoring, initial_location, restored_front_side_element, new_erased, top_level_backside, backside_widgets;
                if (mode === 'suck') {
                    if (widget_side.remove && widget_side.get_type_name() !== 'top-level') {
                       remove_widget(widget_side);
                     } // else warn??
                } else if (mode === 'erase' || (mode === 'restore' && widget_side.get_erased && widget_side.get_erased())) {
                    // erase mode toggles and restore mode unerases if erased
                    if (widget_side.get_type_name() !== 'top-level') {
                        new_erased = !widget_side.get_erased();
                        widget_side.set_erased(new_erased, true);
                        if (TT.robot.in_training && event) {
                            TT.robot.in_training.erased_widget(widget_side, new_erased);
                        }
                    }
                } else if (mode === 'restore') {
                    // doesn't matter what the widget is
                    if (removed_items.length > 0) {
                        restoring = removed_items.pop();
                        restoring.restore_dimensions();
                        restored_front_side_element = widget_side.add_to_top_level_backside(restoring, true);
                        initial_location = $(element).offset();
                        initial_location.left -= $(restored_front_side_element).width(); // left of vacuum
                        TT.UTILITIES.set_absolute_position($(restored_front_side_element), initial_location);
                    }
                } else if (mode === 'suck_all') {
                    top_level_backside = widget_side.top_level_widget();
                    // need to copy the list since removing will alter the list
                    backside_widgets = top_level_backside.get_backside_widgets().slice();
                    backside_widgets.forEach(function (widget_side) {
                                                 if (widget_side.get_widget() !== TT.robot.in_training) {
                                                     remove_widget(widget_side);
                                                 }
                                             });
                }
            },
            nothing_under_tool: function () {
                set_mode(get_next_mode());
            },
            get_element: function () {
                var vacuum_without_button_element;
                if (!element) {
                    element = document.createElement("div");
                    $(element).addClass("toontalk-vacuum");
                    TT.tool.add_listeners(element, this);
                    set_mode('suck');
                    document.addEventListener('keyup', function (event) {
                        var character = String.fromCharCode(event.keyCode);
                        if (character === 's' || character === 'S') {
                            set_mode('suck');
                        } else if (character === 'e' || character === 'E') {
                            set_mode('erase');
                        } else if (character === 'r' || character === 'R') {
                            set_mode('restore');
                        } else if (character === 'a' || character === 'A') {
                            set_mode('suck_all');
                        }
                    });
                    update_title();
                }      
                return element;
            }
        };
    };

    TT.creators_from_json["vacuum"] = function (json, additional_info) {
        var vacuum = TT.vacuum.create();
        if (json.mode) {
            TT.UTILITIES.set_timeout(function () {
                    vacuum.set_mode(json.mode);
                });
        }
        return vacuum;
    };

    return vacuum

}(window.TOONTALK));