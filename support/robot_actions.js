 /**
 * Implements ToonTalk's actions for running robots
 * Authors: Ken Kahn
 * License: New BSD
 */
 
/*jslint browser: true, devel: true, plusplus: true, vars: true, white: true */

window.TOONTALK.actions = 
(function (TT) {
    "use strict";
    return {
        create: function (steps) {
            var robot;
            var new_actions = Object.create(this);
            var newly_created_widgets = [];
            if (!steps) {
                steps = [];
            }
            new_actions.copy = function () {
                return TT.actions.create(TT.UTILITIES.copy_array(steps));
            };
            new_actions.get_steps = function () {
                return steps;
            };
            new_actions.is_empty = function () {
                return steps.length === 0;
            };
            new_actions.reset_steps = function () {
                steps = [];
                this.reset_newly_created_widgets();
            };
            new_actions.reset_newly_created_widgets = function () {
                newly_created_widgets = [];
            };
            new_actions.add_step = function (step, new_widget) {
                step.robot = robot;
                steps[steps.length] = step;
                if (new_widget) {
                    this.add_newly_created_widget(new_widget);
                }
            };
            new_actions.add_newly_created_widget = function (new_widget) {
                newly_created_widgets[newly_created_widgets.length] = new_widget;
            };
            new_actions.get_robot = function () {
                return robot;
            };
            new_actions.set_robot = function (robot_parameter) {
                var i;
                robot = robot_parameter;
                for (i = 0; i < steps.length; i += 1) {
                    steps[i].robot = robot;
                }
            };
            new_actions.get_path_to = function (widget) {
                var i;
                for (i = 0; i < newly_created_widgets.length; i++) {
                    if (newly_created_widgets[i] === widget) {
                        return TT.actions_paths.create(i, new_actions);
                    }
                    // else see if sub-path inside newly_created_widgest[i] (add to TT.UTILITIES) 
                }
            };
            new_actions.dereference = function (index) {
                return newly_created_widgets[index];
            }
            return new_actions;
        },
        
        run: function(context, queue) {
            var i;
            var steps = this.get_steps();
            for (i = 0; i < steps.length; i++) {
                steps[i].run(context);
            }
            this.get_robot().run(context, queue);
        },
        
        toString: function () {
            var description = "";
            var i;
            var steps = this.get_steps();
            for (i = 0; i < steps.length; i++) {
                description += steps[i].toString();
                if (i === steps.length-2) {
                    description += " and ";
                } else if (i < steps.length-2) {
                    description += ", ";
                }
            }
            return description;
        },
        
        get_json: function () {
            return {type: "body",
                    steps: TT.UTILITIES.get_json_of_array(this.get_steps())};
        },
        
        create_from_json: function (json) {
            return TT.actions.create(TT.UTILITIES.create_array_from_json(json.steps));
        }
        
    };
}(window.TOONTALK));

window.TOONTALK.actions_paths =
// paths to widgets created by previous steps
(function (TT) {
    "use strict";
    return {
        create: function (index, actions) {
            return {
                dereference: function () {
                    return actions.dereference(index);
                }
            };
        }
    };
}(window.TOONTALK));