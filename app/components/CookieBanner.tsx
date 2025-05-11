'use client';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputSwitch } from 'primereact/inputswitch';
import { classNames } from 'primereact/utils';

interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  functional: boolean;
  marketing: boolean;
}

const CookieBanner = ({ messages }: { messages: Record<string, string> }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState<CookiePreferences>({
    essential: true,
    performance: false,
    functional: false,
    marketing: false
  });

  useEffect(() => {
    const savedPrefs = localStorage.getItem('cookiePreferences');
    if (savedPrefs) {
      setCookiePrefs(JSON.parse(savedPrefs));
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      performance: true,
      functional: true,
      marketing: true
    };
    setCookiePrefs(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePrefs));
    setShowPreferences(false);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      performance: false,
      functional: false,
      marketing: false
    };
    setCookiePrefs(onlyEssential);
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyEssential));
    setShowBanner(false);
  };

  const cookieCategories = [
    {
      name: 'essential',
      label: messages.cookies_essential,
      description: messages.cookies_essential_desc,
      mandatory: true
    },
    {
      name: 'performance',
      label: messages.cookies_performance,
      description: messages.cookies_performance_desc,
      mandatory: false
    },
    {
      name: 'functional',
      label: messages.cookies_functional,
      description: messages.cookies_functional_desc,
      mandatory: false
    },
    {
      name: 'marketing',
      label: messages.cookies_marketing,
      description: messages.cookies_marketing_desc,
      mandatory: false
    }
  ];

  const footerContent = (
    <div className="flex flex-wrap justify-between gap-3">
      <Button 
        label={messages.cookies_reject_all} 
        severity="secondary" 
        onClick={handleRejectAll}
        outlined
        className="border-dj-gold text-dj-gold hover:bg-dj-gold/10 p-2"
      />
      <div className="flex gap-3">
        <Button 
          label={messages.cookies_save_prefs} 
          onClick={handleSavePreferences}
          className="bg-dj-purple text-white hover:bg-dj-purple/90 p-2"
        />
        <Button 
          label={messages.cookies_accept_all} 
          onClick={handleAcceptAll}
          className="bg-dj-gold border-dj-gold text-dj-dark hover:bg-dj-gold/90 p-2"
        />
      </div>
    </div>
  );

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-dj-darkAccent text-white p-4 z-50 shadow-lg">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 text-dj-gold">{messages.cookies_title}</h3>
                <p className="text-sm text-dj-lightAccent">{messages.cookies_banner_message}</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Button 
                  label={messages.cookies_customize} 
                  severity="secondary" 
                  onClick={() => setShowPreferences(true)}
                  outlined
                  size="small"
                  className="border-dj-gold text-dj-gold hover:bg-dj-gold/10 p-2"
                />
                <Button 
                  label={messages.cookies_accept_all} 
                  onClick={handleAcceptAll}
                  size="small"
                  className="bg-dj-gold border-dj-gold text-dj-dark hover:bg-dj-gold/90 p-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <Dialog 
      modal
        header={messages.cookies_preferences_title}
        visible={showPreferences} 
        onHide={() => setShowPreferences(false)}
        footer={footerContent}
        className="w-full max-w-2xl bg-dj-darkAccent text-white p-4 rounded-md"
        contentClassName="bg-dj-darkAccent"
      >
        <p className="mb-4 text-dj-lightAccent">{messages.cookies_preferences_description}</p>
        
        <Divider className="border-dj-purple" />

        <div className="space-y-4 py-2">
          {cookieCategories.map((category) => (
            <div key={category.name} className="flex items-start gap-4">
              <div className="flex-shrink-0 pt-1">
                <InputSwitch
                  checked={cookiePrefs[category.name as keyof CookiePreferences]}
                  onChange={(e) => setCookiePrefs({
                    ...cookiePrefs,
                    [category.name]: e.value
                  })}
                  disabled={category.mandatory}
                  className={category.mandatory ? 'opacity-50' : ''}
                />
              </div>
              <div>
                <label 
                  htmlFor={category.name}
                  className={classNames('font-medium block mb-1', {
                    'text-dj-light': !category.mandatory,
                    'text-dj-lightAccent': category.mandatory
                  })}
                >
                  {category.label}
                  {category.mandatory && (
                    <span className="text-xs ml-2 bg-dj-purple text-white px-2 py-1 rounded">
                      {messages.cookies_always_on}
                    </span>
                  )}
                </label>
                <p className="text-sm text-dj-lightAccent">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default CookieBanner;