
function mqPrivacyPolicy(cfg) {
  var siteName = cfg.siteName || mqTitle;
  var company = cfg.company || "MapleQuest Innovations";
  var service = cfg.service || "website";
  var email = cfg.email || "legal@maplequestlabs.com";
  var registration = (cfg.registration?`
<h3>Registration</h3>
In order to use certain features of this website, a user must first
complete the registration form. During registration a user is required to
give certain information (such as name and email address). This information
may be used to contact you about the products/services on our site in which
you have expressed interest.
`:"");
  var payedServices = (cfg.payedServices?`
<h3>Payed Services</h3>
We request information from you on our payment form. To access our
payed services, you must provide contact information (like name and address)
and financial information (like credit card number, expiration date). This
information is used for billing purposes and to fill your orders. If we have
trouble processing an order, we'll use this information to contact you.
`:"");
  var content=`
<h2>PRIVACY POLICY</h2>
This privacy notice discloses the privacy practices for ${siteName}.
This privacy notice applies solely to information collected by this
site. It will notify you of the following:

<ul>
<li> What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.
<li> What choices are available to you regarding the use of your data. 
<li> The security procedures in place to protect the misuse of your information. 
<li> How you can correct any inaccuracies in the information.
</ul>

<h3>Information Collection, Use, and Sharing</h3>
We are the sole owners of the information collected on this site. We
only have access to/collect information that you voluntarily give us via
email or other direct contact from you. We will not sell or rent this
information to anyone.

We will use your information to respond to you, regarding the reason
you contacted us. We will not share your information with any third party
outside of our organization, other than as necessary to fulfill your request,
e.g. to service an order.

Unless you ask us not to, we may contact you via email in the future
to tell you about specials, new products or services, or changes to this
privacy policy.

<h3>Your Access to and Control Over Information</h3>
You may opt out of any future contacts from us at any time. You can
do the following at any time by contacting us via email to ${email}:

<ul>
<li> See what data we have about you, if any.
<li> Change/correct any data we have about you.
<li> Have us delete any data we have about you.
<li> Express any concern you have about our use of your data.
</ul>

<h3>Security</h3>
We take precautions to protect your information. When you submit
sensitive information via the website, your information is protected both
online and offline.

Wherever we collect sensitive information (such as credit card data),
that information is encrypted and transmitted to us in a secure way. You
can verify this by looking for a lock icon in the address bar and looking
for https at the beginning of the address of the Web page.

While we use encryption to protect sensitive information transmitted
online, we also protect your information offline. Only employees who need
the information to perform a specific job (for example, billing or customer
service) are granted access to personally identifiable information. The
computers/servers in which we store personally identifiable information
are kept in a secure environment.

${payedServices}

${registration}

<h3>Cookies</h3>
We may use cookies on this site. A cookie is a piece of data stored on a
site visitor's hard drive to help us improve your access to our site and
identify repeat visitors to our site. For instance, when we use a cookie
to identify you, you would not have to log in a password more than once,
thereby saving time while on our site. Cookies can also enable us to track
and target the interests of our users to enhance the experience on our
site. Usage of a cookie is in no way linked to any personally identifiable
information on our site.

<h3>Contact Us</h3>
If you have any questions about our Privacy Policy, please contact us 
via email at ${email}.

`;
  return content;
}

function mqPrivacyPolicyUI(cfg={}) {
  var w=cfg.width||350, h=cfg.height||350;
  var wnd = mqWindow({
    id: 'privacy-policy',
    title: 'Privacy Policy',
    width: w+'px',
    height: h+'px'
  });
  mqSet(wnd,'overflow-y','scroll','user-select','none');
  var obj =  mqMakeWidget({
    tag: 'div',
    id: 'content',
    margin: '8px',
    innerHTML: mqPrivacyPolicy(cfg)
  });
  mqAppend(wnd,obj);
  mqElement('mq-root').scrollTo(0,0);
}


