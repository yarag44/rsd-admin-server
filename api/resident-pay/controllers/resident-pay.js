'use strict';
const stripe = require("stripe")("sk_test_51JTzmlIUUyTPZHVWFSCtjXUqrrXc3cVQxvwOREgwNiV7IaGGwY3DNreTaSZQd2TYqyjE1MgH9a4Gr1EXQRe8NnHJ00Ux6jAPbt");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async create(ctx)
    {

        const { auth,formData,amount,strapitoken,user,comments,month,year,catPaid,SelectedAmenity,resultPago,dateTimeReservation } = ctx.request.body;

        console.log(user);
        console.log('strapitoken ' + strapitoken);

        if(strapitoken)
        {
            if(strapitoken.length > 0)
            {
              const charge = await stripe.charges.create({
                amount: (parseFloat(amount).toFixed(2) * 100).toFixed(0), //totalPayment * 100,
                currency: "mxn",
                source: strapitoken,
                description: `ID Usuario: ${user.id} UserName: ${user.username} Concepto: ${catPaid.TypePay}` ,
              });
            }
        }
        //console.log(SelectedAmenity);

        const createPay = [];

        let data = {

            Amount : amount,
            Year : catPaid.TypePay === 'Reservacion' ? 0 : year,
            Month : catPaid.TypePay === 'Reservacion' ? 0 : month,
            Comments : comments,
            User : user,
            'catalog_pay' : catPaid //,
            //Amenity : SelectedAmenity
        }

        //console.log(catPaid[0]);

        const validData = await strapi.entityValidator.validateEntityCreation(
            strapi.models.resident_pay,
            data
        );

        //console.log(validData);

        const entry = await strapi.query("resident-pay").create(validData);
        createPay.push(entry);


        if(catPaid.TypePay === 'Reservacion')
        {
            let dataReservation = {

                DateTimeReservation : dateTimeReservation.value,
                User : user,
                'resident_pays' : createPay,
                Amenity : SelectedAmenity
            }

            //console.log(dataReservation);

            const validDataReservation = await strapi.entityValidator.validateEntityCreation(
                strapi.models.reservation_pay,
                dataReservation
            );

            const entryReservation = await strapi.query("reservation-pay").create(validDataReservation);
        }
        return createPay;

    }


};
