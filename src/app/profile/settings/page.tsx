'use client'

import React, { useState } from 'react'
import Link from 'next/link' // Keep Link if needed elsewhere, but Button can handle links too
import { Fieldset, FieldGroup, Field, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { Text } from '@/components/catalyst/text'
import { Button } from '@/components/catalyst/button'
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { ChevronLeft } from 'lucide-react' // Use Lucide icon

export default function ProfileSettingsPage() {
  // Basic state for form fields (example)
  const [name, setName] = useState('Kevin Peng'); // Example initial value
  const [email, setEmail] = useState('kevin@example.com'); // Example initial value

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save logic
    console.log('Saving settings:', { name, email });
    // Add feedback mechanism (e.g., toast notification)
  };

  return (
    // Use standard padding, adjust max-width if needed
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto"> {/* Adjusted max-width for settings form */}
        <div className="flex flex-col space-y-8"> {/* Increased spacing */}
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Use Catalyst Heading */}
            <Heading level={1} className="text-2xl font-semibold dark:text-white">
              Profile Settings
            </Heading>
            {/* Use Catalyst Button as Link */}
            <Button href="/profile" outline>
              <ChevronLeft className="size-4" />
              Back to Profile
            </Button>
          </header>

          {/* Settings Form */}
          <form onSubmit={handleSave}>
            <Fieldset>
              {/* Use FieldGroup for logical sections */}
              <FieldGroup>
                {/* Name Field */}
                <Field>
                  <Label>Name</Label>
                  <Input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Field>

                {/* Email Field */}
                <Field>
                  <Label>Email Address</Label>
                  <Input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Text>We'll never share your email with anyone else.</Text>
                </Field>
              </FieldGroup>

              {/* Add more FieldGroups for other settings (Preferences, Notifications, etc.) */}

              {/* Save Button */}
              <div className="mt-8 flex justify-end"> {/* Use spacing scale mt-8 */}
                <Button type="submit">Save Changes</Button>
              </div>
            </Fieldset>
          </form> {/* Add missing closing form tag */}
        </div>
      </div>
    </div>
  )
}
