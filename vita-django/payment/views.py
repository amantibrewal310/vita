from django.shortcuts import render
import braintree
# Create your views here.


gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        environment=braintree.Environment.Sandbox,
        merchant_id='6nfmxd46bzdbtz2z',
        public_key='yj5bvfvyyyq5rwr5',
        private_key='c687933eda6474d19f7830f99c1b4ebe'
    )
)
