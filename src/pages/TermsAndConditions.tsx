import { Link } from "react-router-dom";
import { LegalPage } from "../components/LegalPage";
import { useSeo } from "../lib/seo";

export function TermsAndConditions() {
  useSeo({
    title: "Terms and Conditions | Luxmorai Technologies",
    description: "Terms governing access to and use of the Luxmorai Technologies website.",
    path: "/terms-and-conditions",
  });

  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms and Conditions"
      updated="18 July 2026"
      intro="These terms govern your access to and use of the Luxmorai Technologies website, forms, career features and published content."
    >
      <section>
        <h2>1. Acceptance of these terms</h2>
        <p>
          By accessing or using this website, you agree to these Terms and Conditions and our <Link to="/privacy-policy">Privacy Policy</Link>.
          If you do not agree, please do not use the website. If you use the website for an organisation, you confirm
          that you are authorised to act for that organisation.
        </p>
      </section>

      <section>
        <h2>2. About this website</h2>
        <p>
          The website provides information about Luxmorai Technologies Pvt Ltd, our technology capabilities, services,
          industries, articles, job opportunities and contact channels. Website content is general information and is not
          professional, legal, financial or technical advice for a particular situation.
        </p>
      </section>

      <section>
        <h2>3. Services and commercial engagements</h2>
        <p>
          Website descriptions, examples, timelines and capabilities are illustrative and do not constitute a binding
          offer, warranty or commitment. Any project, subscription, staffing engagement, deliverable, fee, intellectual
          property allocation, service level or support obligation will be governed by a separate written proposal,
          statement of work or agreement. If that agreement conflicts with these terms, the signed agreement controls.
        </p>
      </section>

      <section>
        <h2>4. Permitted use</h2>
        <p>You may use the website for lawful personal or business-information purposes. You must not:</p>
        <ul>
          <li>Break any applicable law or infringe another person’s rights.</li>
          <li>Attempt unauthorised access to accounts, systems, source code, data or infrastructure.</li>
          <li>Introduce malware, harmful code, automated attacks or unreasonable traffic.</li>
          <li>Scrape, harvest or extract personal data or substantial content without written permission.</li>
          <li>Misrepresent your identity, submit false information, impersonate Luxmorai or misuse our brand.</li>
          <li>Interfere with security, availability, recruitment, forms or other users’ access.</li>
          <li>Use website content to create a misleading competing representation or unlawful dataset.</li>
        </ul>
      </section>

      <section>
        <h2>5. Your submissions</h2>
        <p>
          You are responsible for ensuring submitted information is accurate, lawful and does not violate confidentiality,
          intellectual property, privacy or other rights. You grant Luxmorai permission to use, reproduce and internally
          share submissions only as reasonably necessary to respond to your inquiry, evaluate an application, provide
          requested services, protect the website and comply with law. Personal data is handled under our Privacy Policy.
        </p>
      </section>

      <section>
        <h2>6. Careers and recruitment</h2>
        <p>
          Job listings may be changed, paused or withdrawn at any time. An application, assessment, interview, status
          update or verbal discussion is not an employment offer. Employment exists only after a formal written offer
          is issued by an authorised Luxmorai representative and all stated conditions are satisfied. We may verify
          application information where lawful. Luxmorai does not authorise any person or agency to collect money for a
          job, interview, offer letter, registration, training, equipment or background verification.
        </p>
      </section>

      <section>
        <h2>7. Intellectual property</h2>
        <p>
          The website, brand names, logos, designs, layout, software, text, graphics and original content are owned by or
          licensed to Luxmorai and protected by applicable law. You may view and make limited copies for internal,
          non-commercial evaluation. No ownership or broader licence is transferred. You may not reproduce, modify,
          distribute, publish, sell or commercially exploit protected material without prior written permission, except
          where law expressly permits it.
        </p>
      </section>

      <section>
        <h2>8. Third-party links and services</h2>
        <p>
          Links to third-party websites are provided for convenience. Luxmorai does not control or endorse their content,
          availability, security or privacy practices. Your use of third-party services is governed by their own terms.
        </p>
      </section>

      <section>
        <h2>9. Website availability and changes</h2>
        <p>
          We may update, suspend, restrict or discontinue any website feature without notice. We aim to keep information
          useful and accurate but do not guarantee that every page is complete, current, uninterrupted, compatible or
          error-free. You are responsible for appropriate device, network and security protections.
        </p>
      </section>

      <section>
        <h2>10. Disclaimer</h2>
        <p>
          To the maximum extent permitted by law, the website and its content are provided “as is” and “as available.”
          Luxmorai disclaims implied warranties of merchantability, fitness for a particular purpose, non-infringement and
          uninterrupted availability. Nothing excludes a warranty or right that cannot lawfully be excluded.
        </p>
      </section>

      <section>
        <h2>11. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Luxmorai and its directors, employees and representatives will not be
          liable for indirect, incidental, special, consequential or punitive loss, or loss of profits, revenue, data,
          goodwill or opportunity, arising from use of or inability to use the website. For claims that cannot be excluded,
          liability is limited only to the extent permitted by law. This does not limit liability for fraud, wilful
          misconduct or any liability that law does not permit us to limit.
        </p>
      </section>

      <section>
        <h2>12. Indemnity</h2>
        <p>
          To the extent permitted by law, you agree to compensate Luxmorai for reasonable losses, liabilities and costs
          arising directly from your unlawful use, deliberate security interference, infringement of third-party rights,
          or material breach of these terms.
        </p>
      </section>

      <section>
        <h2>13. Privacy</h2>
        <p>
          Our <Link to="/privacy-policy">Privacy Policy</Link> explains how we handle personal data. By submitting a form,
          you confirm that you provided accurate information and have authority to provide any personal data included.
        </p>
      </section>

      <section>
        <h2>14. Governing law and disputes</h2>
        <p>
          These terms are governed by the laws of India. Subject to any mandatory legal forum or remedy, courts with
          jurisdiction in Hyderabad, Telangana will have exclusive jurisdiction over website-related disputes. Before
          formal proceedings, the parties should try in good faith to resolve the issue through written communication
          for at least 30 days.
        </p>
      </section>

      <section>
        <h2>15. General provisions</h2>
        <p>
          If a provision is invalid, the remaining provisions continue. A failure to enforce a provision is not a waiver.
          You may not transfer your rights without our written consent. Headings are for convenience. These terms do not
          create a partnership, agency or employment relationship.
        </p>
      </section>

      <section>
        <h2>16. Changes to these terms</h2>
        <p>
          We may update these terms for changes in the website, services or law. Revised terms take effect when posted
          with the updated date. Continued use after an update means you accept the revised terms.
        </p>
      </section>

      <section>
        <h2>17. Contact</h2>
        <p>
          Luxmorai Technologies Pvt Ltd<br />
          19/3RT, Line 2, Street 5, Prakash Nagar, Begumpet, Hyderabad, Telangana 500016, India<br />
          Email: <a href="mailto:info@luxmorai.com">info@luxmorai.com</a><br />
          Phone: <a href="tel:+919884050511">+91 9884050511</a>
        </p>
      </section>
    </LegalPage>
  );
}
