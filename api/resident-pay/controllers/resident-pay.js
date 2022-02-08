'use strict';
const stripe = require("stripe")("sk_test_51JTzmlIUUyTPZHVWFSCtjXUqrrXc3cVQxvwOREgwNiV7IaGGwY3DNreTaSZQd2TYqyjE1MgH9a4Gr1EXQRe8NnHJ00Ux6jAPbt");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async create(ctx)
    {

        const { auth,formData,amount,strapitoken,user,comments,month,year,catPaid } = ctx.request.body;

        // console.log(amount);
        // console.log(user.id);


        // const charge = await stripe.charges.create({
        //     amount: (parseFloat(amount).toFixed(2) * 100).toFixed(0), //totalPayment * 100,
        //     currency: "mxn",
        //     source: strapitoken,
        //     description: `ID Usuario: ${user.id}` ,
            
        // });

       
        const createPay = [];

        let data = {

            Amount : amount,
            Year : year,
            Month : month,
            Comments : comments,
            User : user,
            'catalog_pay' : catPaid
        }

        //console.log(catPaid[0]);

        const validData = await strapi.entityValidator.validateEntityCreation(
            strapi.models.resident_pay,
            data
        );

        //console.log(validData);

        const entry = await strapi.query("resident-pay").create(validData);
        createPay.push(entry);


        return createPay;

    }


};
