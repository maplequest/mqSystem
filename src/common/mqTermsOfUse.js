
function mqTermsOfUse(cfg) {
  var siteName = cfg.siteName || mqTitle;
  var company = cfg.company || "MapleQuest Innovations";
  var service = cfg.service || "website";
  var email = cfg.email || "legal@maplequestlabs.com";
  var healthcareDisclaimer = (cfg.healthcareDisclaimer?`
<h2>Healthcare Disclaimer</h2>
This site and ${company} do not provide any medical
advice, diagnosis or treatment, nor offer any medical devices for sale. 
Use of this site or any site-related service, product or device does
not create a physician-patient relationship between you and ${company}. You should
consult your physician with regard to all diagnoses and treatments.
`:"");
  var clinicalDisclaimer = (cfg.clinicalDisclaimer?`
<h2>Clinical Disclaimer</h2>
This site and ${company} is provided for training and research purposes only.
Its content must not be relied upon for clinical diagnosis, and all clinical decisions
must be performed by trained clinicians. 
`:"");
  var content=`
<h1>TERMS OF USE</h1>

Please read these Terms of Use ("Terms", "Terms of Use") carefully before
using this ${service} (the "Service") provided by   
 ${siteName} ("us", "we", or "our").

Your access to and use of the Service is conditioned on your acceptance
of and compliance with these Terms. These Terms apply to all visitors,
users and others who access or use the Service. 

By accessing or using the Service you agree to be bound by these Terms. If
you disagree with any part of the terms then you may not access the Service.

<h2>Content</h2>
All text, artwork, visual and audio media, and computer code (collectively,
"Content", including but not limited to the design, structure and look
and feel of such Content, contained on ${siteName}
is protected by copyright, patent and trademark laws.

No part of the protected Content may be copied, reproduced, republished, uploaded, posted,
publicly displayed, encoded, translated, transmitted or distributed in any
way to any other computer, server, website or other
medium for publication or distribution or any commercial activity,
without express prior written consent from ${company}.

<h2>Purchases</h2>
If you wish to purchase any product or service made available through
the Service ("Purchase"), you may be asked to supply certain information
relevant to your Purchase including, without limitation, your contact 
information (like name and address) and financial information (like credit 
card number, expiration date).

<h2>Privacy</h2>
Please review our Privacy Policy for details on the manner in which 
we collect, use, disclose and otherwise manage your personal information.

<h2>Termination</h2>
We may terminate or suspend access to our Service immediately, without
prior notice or liability, for any reason whatsoever, including without
limitation if you breach the Terms.  All provisions of the Terms which
by their nature should survive termination shall survive termination,
including, without limitation, ownership provisions, warranty disclaimers,
indemnity and limitations of liability.

<h2>Links To Other Web Sites</h2>
Our Service may contain links to third-party web sites or services
that are not owned or controlled by ${company}.
${company} has no control over, and assumes no responsibility for, the
content, privacy policies, or practices of any third party web sites or
services. You further acknowledge and agree that ${company}
shall not be responsible or liable, directly or indirectly, for any
damage or loss caused or alleged to be caused by or in connection with
use of or reliance on any such content, goods or services available on or
through any such web sites or services.

${healthcareDisclaimer}

${clinicalDisclaimer}

<h2>Warranty Disclaimer</h2>
THIS SITE, INCLUDING ANY CONTENT OR INFORMATION CONTAINED WITHIN IT OR
ANY SITE-RELATED SERVICE, IS PROVIDED BY ${company.toUpperCase()} "AS IS" AND ANY 
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL ${company.toUpperCase()}
BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SITE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.

<h2>Changes</h2>
We reserve the right, at our sole discretion, to modify or replace these
Terms at any time. If a revision is material we will try to provide at least
7 days notice prior to any new terms taking effect. What
constitutes a material change will be determined at our sole discretion.

<h2>Contact Us</h2>
If you have any questions about these Terms, please contact us via email at ${email}.

`;
  return content;
}

function mqTermsOfUseUI(cfg={}) {
  var w=cfg.width||350, h=cfg.height||350;
  var wnd = mqWindow({
    id: 'terms-of-use',
    title: 'Terms Of Use',
    width: w+'px',
    height: h+'px'
  });
  mqSet(wnd,'overflow-y','scroll','user-select','none');
  var obj =  mqMakeWidget({
    tag: 'div',
    id: 'content',
    margin: '8px',
    innerHTML: mqTermsOfUse(cfg)
  });
  mqAppend(wnd,obj);
  mqElement('mq-root').scrollTo(0,0);
}


