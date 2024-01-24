"use strict";
/*
 * Copyright IBM Corporation 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCheck = exports.ShutdownCheck = exports.LivenessCheck = exports.ReadinessCheck = exports.StartupCheck = exports.HealthChecker = exports.ReadinessEndpoint = exports.LivenessEndpoint = exports.HealthEndpoint = void 0;
const health_1 = require("@cloudnative/health");
Object.defineProperty(exports, "HealthChecker", { enumerable: true, get: function () { return health_1.HealthChecker; } });
Object.defineProperty(exports, "StartupCheck", { enumerable: true, get: function () { return health_1.StartupCheck; } });
Object.defineProperty(exports, "ReadinessCheck", { enumerable: true, get: function () { return health_1.ReadinessCheck; } });
Object.defineProperty(exports, "LivenessCheck", { enumerable: true, get: function () { return health_1.LivenessCheck; } });
Object.defineProperty(exports, "ShutdownCheck", { enumerable: true, get: function () { return health_1.ShutdownCheck; } });
Object.defineProperty(exports, "PingCheck", { enumerable: true, get: function () { return health_1.PingCheck; } });
var StateCode;
(function (StateCode) {
    StateCode[StateCode["OK"] = 200] = "OK";
    StateCode[StateCode["DOWN"] = 503] = "DOWN";
    StateCode[StateCode["ERRORED"] = 500] = "ERRORED";
})(StateCode || (StateCode = {}));
function HealthEndpoint(checker) {
    let middleware = function (req, res, next) {
        checker.getStatus()
            .then((status) => {
            switch (status.status) {
                case health_1.State.STARTING:
                    res.statusCode = StateCode.DOWN;
                    break;
                case health_1.State.UP:
                    res.statusCode = StateCode.OK;
                    break;
                case health_1.State.DOWN:
                    res.statusCode = StateCode.DOWN;
                    break;
                case health_1.State.STOPPING:
                    res.statusCode = StateCode.DOWN;
                    break;
                case health_1.State.STOPPED:
                    res.statusCode = StateCode.DOWN;
                    break;
            }
            res.write(JSON.stringify(status));
            res.end();
        })
            .catch((err) => { res.end(); });
    };
    return middleware;
}
exports.HealthEndpoint = HealthEndpoint;
function LivenessEndpoint(checker) {
    let middleware = function (req, res, next) {
        checker.getLivenessStatus()
            .then((status) => {
            switch (status.status) {
                case health_1.State.STARTING:
                    res.statusCode = StateCode.OK;
                    break;
                case health_1.State.UP:
                    res.statusCode = StateCode.OK;
                    break;
                case health_1.State.DOWN:
                    res.statusCode = StateCode.DOWN;
                    break;
                case health_1.State.STOPPING:
                    res.statusCode = StateCode.DOWN;
                    break;
                case health_1.State.STOPPED:
                    res.statusCode = StateCode.DOWN;
                    break;
            }
            res.write(JSON.stringify(status));
            res.end();
        })
            .catch((err) => { res.end(); });
    };
    return middleware;
}
exports.LivenessEndpoint = LivenessEndpoint;
function ReadinessEndpoint(checker) {
    let middleware = function (req, res, next) {
        checker.getReadinessStatus()
            .then((status) => {
            res.statusCode = StateCode.OK;
            switch (status.status) {
                case health_1.State.STARTING:
                    res.statusCode = StateCode.DOWN;
                    break;
                case health_1.State.UP:
                    res.statusCode = StateCode.OK;
                    break;
                case health_1.State.DOWN:
                    res.statusCode = StateCode.DOWN;
                    break;
                case health_1.State.STOPPING:
                    res.statusCode = StateCode.DOWN;
                    break;
                case health_1.State.STOPPED:
                    res.statusCode = StateCode.DOWN;
                    break;
            }
            res.write(JSON.stringify(status));
            res.end();
        })
            .catch((err) => { res.end(); });
    };
    return middleware;
}
exports.ReadinessEndpoint = ReadinessEndpoint;
//# sourceMappingURL=ConnectHealth.js.map