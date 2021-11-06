module.exports.test = async(event: any): Promise<any> => {
    try {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(
                {
                    message: `Some successfull: ${process.env.SENDGRID_API_KEY}, TO_EMAIL: ${process.env.TO_EMAIL}, FROM_EMAIL: ${process.env.FROM_EMAIL}`
                }
            ),
        };
    } catch (error) {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                message: error,
                region: process.env.AWS_REGION
            })
        }
    }
}