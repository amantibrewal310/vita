import braintree
from decouple import config
gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        environment=braintree.Environment.Sandbox,
        merchant_id=config('BRAINTREE_MERCHANT_ID'),
        public_key=config('BRAINTREE_PUBLIC_KEY'),
        private_key=config('BRAINTREE_PRIVATE_KEY')
    )
)
