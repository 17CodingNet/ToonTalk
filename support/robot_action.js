 /**
 * Implements ToonTalk's generic action of a robot
 * Authors: Ken Kahn
 * License: New BSD
 */
 
 /*jslint browser: true, devel: true, plusplus: true, vars: true, white: true */

window.TOONTALK.robot_action = 
(function (TT) {
    "use strict";
    var unwatched_run_functions =
        {"copy": function (widget, context, robot) {
            robot.add_newly_created_widget(widget.copy(true));
            return true;
          },
         "pick up": function (widget, context, robot) {
             robot.set_thing_in_hand(widget);
             return true;
         },
         "pick up a copy": function (widget, context, robot) {
			 var widget_copy = widget.copy();
			 robot.add_newly_created_widget(widget_copy);
             robot.set_thing_in_hand(widget_copy);
             return true;
         },
         "drop it on": function (target, context, robot) {
             var thing_in_hand;
             if (target) {
                 thing_in_hand = robot.get_thing_in_hand();
                 if (thing_in_hand) {
                     if (thing_in_hand.drop_on) {
                         if (target instanceof jQuery) {
                             // e.g. dropped on top-level backside
                             target.append(thing_in_hand.get_frontside_element());
                             robot.add_newly_created_widget(thing_in_hand);
                         } else {
                             thing_in_hand.drop_on(target);
                             if (target.visible()) {
                                 TT.DISPLAY_UPDATES.pending_update(target);
                             }
                         }
						 robot.set_thing_in_hand(undefined);
                     } else {
                         console.log("Thing in robot's hand doesn't handle 'drop_on': "  + thing_in_hand.toString() + ". Robot that " + robot.toString());
                         return false;
                     }
                     return true;
                 }
                 console.log("The robot that " + robot.toString() + " is executing drop_on but has nothing in its hand.");
            }
            return false;
         },
         "remove": function (widget, context, robot) {
             widget.remove();     
             return true;
         },
         "edit": function (widget, context, robot, additional_info) {
             // user setter_name instead of the function itself so can be JSONified
             // could replace with function on first use if this is a performance issue
             if (additional_info.argument_2) {
                 widget[additional_info.setter_name].call(widget, additional_info.argument_1, additional_info.argument_2, widget.visible());
             } else {
                 widget[additional_info.setter_name].call(widget, additional_info.argument_1, widget.visible());
             }
             return true;
         },
         "set_erased": function (widget, context, robot, additional_info) {
             widget.set_erased(additional_info.erased);
             return true;
         }
    };
	var find_widget_element = function (widget) {
		var widget_element = widget.get_side_element();
		if (!widget_element) {
			widget_element = TT.UTILITIES.find_resource_equal_to_widget(widget);
		}
		return widget_element;
	};
	var move_to_element = function (moving_widget, target_element, continuation, left_offset, top_offset) {
		// perhaps move this to widget file
		var mover_frontside_element = moving_widget.get_frontside_element();
		var target_absolute_position = $(target_element).offset();
		var mover_absolute_position = $(mover_frontside_element).offset();
		var mover_relative_position = $(mover_frontside_element).position();
		var remove_transition_class = function () {
			$(mover_frontside_element).removeClass("toontalk-side-animating");
		};
		if (!left_offset) {
			left_offset = 0;
		}
		if (!top_offset) {
			top_offset = 0;
		}
		TT.UTILITIES.add_one_shot_transition_end_handler(mover_frontside_element, remove_transition_class);
		$(mover_frontside_element).addClass("toontalk-side-animating");
		mover_frontside_element.style.left = (mover_relative_position.left + left_offset + (target_absolute_position.left - mover_absolute_position.left)) + "px";
	    mover_frontside_element.style.top = (mover_relative_position.top + top_offset + (target_absolute_position.top - mover_absolute_position.top)) + "px";
		TT.UTILITIES.add_one_shot_transition_end_handler(mover_frontside_element, continuation);
	};
	var move_to_widget = function (moving_widget, target_widget, continuation, left_offset, top_offset) {
		move_to_element(moving_widget, find_widget_element(target_widget), continuation, left_offset, top_offset);
	};
	var move_robot_animation = function (widget, context, robot, continuation) {
		var robot_frontside_element = robot.get_frontside_element();
		var thing_in_hand = robot.get_thing_in_hand();
		if (widget instanceof jQuery) {
			// top-level backside
			widget = widget.data("owner");
		}
		move_to_widget(robot, widget, continuation, 0, -$(robot_frontside_element).height());
		if (thing_in_hand) {
			// so robot displays what he's holding
			TT.DISPLAY_UPDATES.pending_update(robot);
		}
	};
	var move_robot_animation_and_drop_it = function (widget, context, robot, continuation) {
		var thing_in_hand = robot.get_thing_in_hand();
		var $thing_in_hand_frontside_element, adjust_dropped_location;
		if (!thing_in_hand) {
			console.log("expected " + robot + " to have thing_in_hand.");
			move_robot_animation(widget, context, robot, continuation);
			return;
		}
		$thing_in_hand_frontside_element = $(thing_in_hand.get_frontside_element());
		adjust_dropped_location = function () {
			var thing_in_hand_position = $thing_in_hand_frontside_element.offset();
			$thing_in_hand_frontside_element.removeClass("toontalk-held-by-robot");
			continuation();
			if ($thing_in_hand_frontside_element.is(":visible")) {
				TT.UTILITIES.set_absolute_position($thing_in_hand_frontside_element, thing_in_hand_position);
			}
		};
		move_robot_animation(widget, context, robot, adjust_dropped_location);
	};
	var find_sibling = function (widget, class_name_selector) {
		// move this to UTILITIES?
		var frontside_element = widget.get_frontside_element();
		var $container_element = $(frontside_element).closest(".toontalk-backside");
		return $container_element.find(class_name_selector).get(0);
	};
	var copy_animation = function (widget, context, robot, continuation) {
		var button_element = find_sibling(robot, ".toontalk-copy-backside-button");
		var robot_frontside_element = robot.get_frontside_element();
		var new_continuation = function () {
			continuation();
			widget.add_copy_to_container(robot.get_recently_created_widget());
		};
		move_to_element(robot, button_element, new_continuation, 0, -$(robot_frontside_element).height());
	};
    var watched_run_functions = 
		{"copy": copy_animation,
		 "pick up": move_robot_animation,
		 "pick up a copy": move_robot_animation,
		 "drop it on": move_robot_animation_and_drop_it
		};
    return {
        create: function (path, action_name, additional_info) {
            var new_action = Object.create(this);
            var unwatched_run_function = unwatched_run_functions[action_name];
            var watched_run_function = watched_run_functions[action_name];
            if (!watched_run_function) {
                watched_run_function = function (referenced, context, robot, continuation, additional_info) {
					setTimeout(function ()  {
// 						unwatched_run_function(referenced, context, robot, additional_info);
						continuation(referenced);
						},
						3000);
                };
            }
            if (!path) {
                console.log("path undefined in " + action_name + " action");
            }
            if (!unwatched_run_function) {
                console.log("no run_function for " + action_name);
            }
            new_action.run_unwatched = function (context, robot) {
                var referenced = TT.path.dereference_path(path, context);
                if (!referenced) {
			        console.log("Unable to dereference path: " + TT.path.toString(path) + " in context: " + context.toString());
                    return false;
                }
                return unwatched_run_function(referenced, context, robot, additional_info);
            };
			new_action.do_step = function (referenced, context, robot, additional_info) {
				 return unwatched_run_function(referenced, context, robot, additional_info);
			};
            new_action.run_watched = function (context, robot, continuation) {
                var referenced = TT.path.dereference_path(path, context);
				var new_continuation = function () {
					continuation(referenced);
				};
                if (!referenced) {
			        console.log("Unable to dereference path: " + TT.path.toString(path) + " in context: " + context.toString());
                    return false;
                }
                return watched_run_function(referenced, context, robot, new_continuation, additional_info);
            };
            new_action.toString = function () {
                var action = additional_info && additional_info.toString ? additional_info.toString : action_name;
                return action + " " + TT.path.toString(path);
            };
            new_action.get_json = function () {
                var json = {type: "robot_action",
                            action_name: action_name,
                            path: TT.path.get_json(path)};
                if (additional_info) {
                    json.additional_info = additional_info;
                }
                return json;                           
            };
            return new_action;  
        },
        create_from_json: function (json, ignore_view, additional_info) {
            if (json.additional_info) {
                return TT.robot_action.create(TT.path.create_from_json(json.path, additional_info), json.action_name, json.additional_info);
            } else {
                return TT.robot_action.create(TT.path.create_from_json(json.path, additional_info), json.action_name);
            }
        }};
}(window.TOONTALK));