import _ from "lodash";

const formatGraphhQLErrors = error => {
    const errorDetails = _.get(error, "extensions.exception.response.data.message");
    try {
        if (errorDetails) return errorDetails
    } catch (e) { }
    return error
}

export default formatGraphhQLErrors;