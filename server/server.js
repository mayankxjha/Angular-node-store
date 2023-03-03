const exp = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

app = exp();
app.use(exp.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));
const stripe = require('stripe')('sk_test_51MfG7sSCtjAIxFV4Snb5TrGOuukN7UVoPGg0ihRFlOJIDeu0Dvk1FkYc0RQN36g9dbMfbHWbsFWV5Qn6vOHERvVH00ZJQxry4w');
app.post('/checkout', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item)=>({
        price_data: {currency: 'usd',
          product_data: {name: item.name, images: [item.product]},
          unit_amount: item.price * 100},
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:4242/success.html',
      cancel_url: 'http://localhost:4242/cancel.html',
    });
    res.status(200).json(session)
  } catch (error) {
    res.status(200).json({error: 'cry'})
  }
})

app.listen(4242, () => console.log("app is running on 4242"))

