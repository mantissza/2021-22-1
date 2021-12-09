module.exports = (schema, fn) => {
    // Deep copy
    const fnOriginal = fn.bind({});
    // fn kiterjesztése, kibővítése
    fn = async (data, ack) => {
        try {  
            const result = schema.validate(data);
            if (result.hasOwnProperty("error")) {
                //console.log(result.error);
                throw result.error;
            }
            return await fnOriginal(data, ack);
        } catch (error) {
            ack({
                status: "error",
                message: error.message,
            });
        }
    }
    return fn;
}