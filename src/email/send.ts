const sgMail = require('@sendgrid/mail');
// use sendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.send = async (event: any = {}): Promise<any> => {
    try {
        const body = JSON.parse(event.body);
        const msg = {
            to: process.env.TO_EMAIL,
            from: process.env.FROM_EMAIL,
            subject: body.subject,
            text: body.message,
            html: `<strong>${body.message}</strong>`, 
        }

        return await sgMail
        .send(msg)
        .then(() => {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(
                    {
                        message: 'Email has been sent'
                    }
                ),
            };
        })
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