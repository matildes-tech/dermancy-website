'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { treatments } from '@/lib/treatments';
import { cn } from '@/lib/utils';
import { CheckCircle2, Calendar, User, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useThemeConfig } from '@/themes/ThemeProvider';
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  getDay,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

const steps = [
  { key: 'step1', icon: CheckCircle2 },
  { key: 'step2', icon: Calendar },
  { key: 'step3', icon: User },
  { key: 'step4', icon: FileCheck },
] as const;

const timeSlots = [
  '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
  '17:30', '18:00', '18:30',
];

export function BookingWizard() {
  const t = useTranslations('booking');
  const tt = useTranslations('treatments');
  const { classes } = useThemeConfig();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: calStart, end: calEnd });

  function canProceed() {
    if (currentStep === 0) return !!selectedTreatment;
    if (currentStep === 1) return !!selectedDate && !!selectedTime;
    if (currentStep === 2) return formData.name.length >= 2 && formData.email.includes('@') && formData.phone.length >= 6;
    return false;
  }

  function isDayDisabled(day: Date) {
    return isBefore(day, today) || getDay(day) === 0; // No Sundays
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          treatment: selectedTreatment,
          date: selectedDate?.toISOString(),
          time: selectedTime,
          ...formData,
        }),
      });
      setSubmitted(true);
    } catch {
      // handle error
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 glass-card">
        <CheckCircle2 className="w-16 h-16 text-cta mx-auto mb-6" />
        <h2 className="heading-section text-foreground mb-2">{t('form.success')}</h2>
        <p className="text-muted-foreground">{t('form.successMessage')}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {steps.map((step, i) => {
          const StepIcon = step.icon;
          return (
            <div key={step.key} className="flex items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                  i <= currentStep
                    ? 'bg-primary text-white'
                    : 'bg-muted/30 text-muted-foreground'
                )}
              >
                <StepIcon className="w-5 h-5" />
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'w-12 h-0.5 mx-1',
                    i < currentStep ? 'bg-primary' : 'bg-muted/30'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Title */}
      <div className="text-center mb-8">
        <h2 className="font-heading font-semibold text-xl text-foreground">
          {t(`${steps[currentStep].key}.title`)}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t(`${steps[currentStep].key}.description`)}
        </p>
      </div>

      {/* Step Content */}
      <div className="glass-card p-6 sm:p-8">
        {/* Step 1: Treatment Selection */}
        {currentStep === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {treatments.map((tr) => {
              const Icon = tr.icon;
              return (
                <button
                  key={tr.slug}
                  onClick={() => setSelectedTreatment(tr.slug)}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-card border-2 text-start transition-all cursor-pointer',
                    selectedTreatment === tr.slug
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30'
                  )}
                >
                  <div className="w-10 h-10 rounded-card bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {tt(`${tr.translationKey}.title`)}
                    </p>
                    <p className="text-xs text-muted-foreground">{tr.duration}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Step 2: Date & Time */}
        {currentStep === 1 && (
          <div className="space-y-8">
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                disabled={isSameMonth(currentMonth, today)}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer p-2"
              >
                &larr;
              </button>
              <h3 className="font-heading font-semibold text-foreground">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="text-muted-foreground hover:text-foreground cursor-pointer p-2"
              >
                &rarr;
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
                <div key={d} className="text-xs font-medium text-muted-foreground py-2">{d}</div>
              ))}
              {calendarDays.map((day) => {
                const disabled = isDayDisabled(day) || !isSameMonth(day, currentMonth);
                const selected = selectedDate && isSameDay(day, selectedDate);
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => !disabled && setSelectedDate(day)}
                    disabled={disabled}
                    className={cn(
                      'aspect-square flex items-center justify-center rounded-full text-sm transition-colors cursor-pointer',
                      disabled && 'opacity-20 cursor-not-allowed',
                      selected && 'bg-primary text-white',
                      !disabled && !selected && 'hover:bg-primary/10 text-foreground',
                      !isSameMonth(day, currentMonth) && 'text-muted-foreground/30'
                    )}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">
                  {t('calendar.selectTime')} — {format(selectedDate, 'EEEE, MMM d')}
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        'py-2 rounded-button text-sm transition-colors cursor-pointer',
                        selectedTime === time
                          ? 'bg-primary text-white'
                          : 'border border-border hover:border-primary/30 text-foreground'
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Personal Info */}
        {currentStep === 2 && (
          <div className="space-y-5 max-w-md mx-auto">
            <Input
              label={t('form.name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label={t('form.email')}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label={t('form.phone')}
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Textarea
              label={t('form.notes')}
              placeholder={t('form.notesPlaceholder')}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 3 && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-4">
              {[
                { label: 'Treatment', value: selectedTreatment ? tt(`${treatments.find(t => t.slug === selectedTreatment)?.translationKey}.title`) : '' },
                { label: 'Date', value: selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : '' },
                { label: 'Time', value: selectedTime || '' },
                { label: 'Name', value: formData.name },
                { label: 'Email', value: formData.email },
                { label: 'Phone', value: formData.phone },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-3 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium text-foreground">{value}</span>
                </div>
              ))}
              {formData.notes && (
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm text-foreground">{formData.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="ghost"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          className={cn(currentStep === 0 && 'invisible')}
        >
          {t('steps.back')}
        </Button>

        {currentStep < 3 ? (
          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceed()}
          >
            {t('steps.next')}
          </Button>
        ) : (
          <Button onClick={handleSubmit} loading={submitting}>
            {t('form.submit')}
          </Button>
        )}
      </div>
    </div>
  );
}
