<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('Professionals', function (Blueprint $table) {
            $table->id('idProfessionals');
            $table->string('nameProfessionals', 45)->nullable();
            $table->text('bioProfessionals', 1024)->nullable();
            $table->string('addressProfessionals', 256)->nullable();
            $table->string('phoneProfessionals', 45)->nullable();
            $table->string('nameBusinessProfessionals', 45)->nullable();
            $table->timestamp('createdProfessionals')->nullable();
            $table->timestamp('updatedProfessionals')->nullable();
            $table->unsignedBigInteger('idUsers')->nullable();

            $table->foreign('idUsers')->references('id')->on('Users');
        });

        Schema::create('Customers', function (Blueprint $table) {
            $table->id('idCustomers');
            $table->string('nameCustomers', 45)->nullable();
            $table->string('phoneCustomers', 45)->nullable();
            $table->string('addressCustomers', 256)->nullable();
            $table->timestamp('createdCustomers')->nullable();
            $table->timestamp('updatedCustomers')->nullable();
            $table->unsignedBigInteger('idUsers')->nullable();

            $table->foreign('idUsers')->references('id')->on('Users');
        });

        Schema::create('ContactsTypes', function (Blueprint $table) {
            $table->id('idContactsTypes');
            $table->string('nameContactsTypes', 45)->nullable();
        });

        Schema::create('Contacts', function (Blueprint $table) {
            $table->id('idContacts');
            $table->string('descContacts', 45)->nullable();
            $table->unsignedBigInteger('idContactsTypes')->nullable();
            $table->boolean('isActiveContacts')->nullable();
            $table->unsignedBigInteger('idCustomers')->nullable();
            $table->unsignedBigInteger('idProfessionals')->nullable();

            $table->foreign('idContactsTypes')->references('idContactsTypes')->on('ContactsTypes');
            $table->foreign('idCustomers')->references('idCustomers')->on('Customers');
            $table->foreign('idProfessionals')->references('idProfessionals')->on('Professionals');
        });

        Schema::create('ServicesTypes', function (Blueprint $table) {
            $table->id('idServicesTypes');
            $table->string('nameServicesTypes', 45)->nullable();
        });

        Schema::create('Services', function (Blueprint $table) {
            $table->id('idServices');
            $table->unsignedBigInteger('idProfessionals')->nullable();
            $table->unsignedBigInteger('idServicesTypes')->nullable();
            $table->string('nameServices', 45)->nullable();
            $table->text('descriptionServices', 500)->nullable();
            $table->decimal('priceServices', 6, 2)->nullable();
            $table->integer('durationMinutesServices')->nullable();
            $table->boolean('isActiveServices')->nullable();
            $table->timestamp('createdServices')->nullable();
            $table->timestamp('updatedServices')->nullable();

            $table->foreign('idProfessionals')->references('idProfessionals')->on('Professionals');
            $table->foreign('idServicesTypes')->references('idServicesTypes')->on('ServicesTypes');
        });

        Schema::create('Appointments', function (Blueprint $table) {
            $table->id('idAppointments');
            $table->unsignedBigInteger('idProfessionals')->nullable();
            $table->unsignedBigInteger('idCustomers')->nullable();
            $table->unsignedBigInteger('idServices')->nullable();
            $table->dateTime('startDatetimeAppointments')->nullable();
            $table->dateTime('endDatetimeMarkings')->nullable();
            $table->enum('statusAppointments', ['scheduled', 'completed', 'cancelled', 'no_show'])->nullable();
            $table->text('notesAppointments', 500)->nullable();
            $table->timestamp('createdAppointments')->nullable();
            $table->timestamp('updatedAppointments')->nullable();

            $table->foreign('idProfessionals')->references('idProfessionals')->on('Professionals');
            $table->foreign('idCustomers')->references('idCustomers')->on('Customers');
            $table->foreign('idServices')->references('idServices')->on('Services');
        });

        Schema::create('ScheduleBlocksTypes', function (Blueprint $table) {
            $table->id('idReservationsScheduleBlocks');
            $table->string('nameReservationsScheduleBlocks', 45)->nullable();
            $table->string('colorReservationsScheduleBlocks', 10)->nullable();
        });

        Schema::create('ScheduleBlocks', function (Blueprint $table) {
            $table->id('idScheduleBlocks');
            $table->unsignedBigInteger('idProfessionals')->nullable();
            $table->dateTime('startDatetimeScheduleBlocks')->nullable();
            $table->dateTime('endDatetimeScheduleBlocks')->nullable();
            $table->unsignedBigInteger('idReservationsTypes')->nullable();
            $table->string('descriptionScheduleBlocks', 100)->nullable();
            $table->timestamp('createdScheduleBlocks')->nullable();
            $table->timestamp('updatedScheduleBlocks')->nullable();

            $table->foreign('idProfessionals')->references('idProfessionals')->on('Professionals');
            $table->foreign('idReservationsTypes')->references('idReservationsScheduleBlocks')->on('ScheduleBlocksTypes');
        });

        Schema::create('WorkingHours', function (Blueprint $table) {
            $table->id('idWorkingHours');
            $table->unsignedBigInteger('idProfessionals')->nullable();
            $table->integer('weekdayWorkingHours')->nullable();
            $table->time('startTimeWorkingHours')->nullable();
            $table->time('endTimeWorkingHours')->nullable();
            $table->timestamp('createdWorkingHours')->nullable();
            $table->timestamp('updatedWorkingHours')->nullable();

            $table->foreign('idProfessionals')->references('idProfessionals')->on('Professionals');
        });

        Schema::create('SubscriptionPlans', function (Blueprint $table) {
            $table->id('idSubscriptionPlans');
            $table->string('nameSubscriptionPlans', 45)->nullable();
            $table->decimal('priceSubscriptionPlans', 6, 2)->nullable();
            $table->json('featuresSubscriptionPlans')->nullable();
            $table->timestamp('createdSubscriptionPlans')->nullable();
            $table->timestamp('updatedSubscriptionPlans')->nullable();
        });

        Schema::create('Subscriptions', function (Blueprint $table) {
            $table->id('idSubscriptions');
            $table->unsignedBigInteger('idProfessionals')->nullable();
            $table->unsignedBigInteger('idSubscriptionPlans')->nullable();
            $table->date('startDateSubscriptions')->nullable();
            $table->date('endDateSubscriptions')->nullable();
            $table->enum('statusSubscriptions', ['active', 'expired', 'cancelled'])->nullable();
            $table->timestamp('createdSubscriptions')->nullable();
            $table->timestamp('updatedSubscriptions')->nullable();

            $table->foreign('idProfessionals')->references('idProfessionals')->on('Professionals');
            $table->foreign('idSubscriptionPlans')->references('idSubscriptionPlans')->on('SubscriptionPlans');
        });

        Schema::create('Payments', function (Blueprint $table) {
            $table->id('idPayments');
            $table->unsignedBigInteger('idSubscriptions')->nullable();
            $table->decimal('amountPayments', 6, 2)->nullable();
            $table->string('currencyPayments', 3)->nullable();
            $table->string('methodPayments', 256)->nullable();
            $table->string('transactionCodePayments', 256)->nullable();
            $table->enum('statusPayments', ['paid', 'pending', 'failed'])->nullable();
            $table->dateTime('paymentDatePayments')->nullable();
            $table->timestamp('createdPayments')->nullable();

            $table->foreign('idSubscriptions')->references('idSubscriptions')->on('Subscriptions');
        });

        Schema::create('PaymentMethods', function (Blueprint $table) {
            $table->id('idPaymentMethods');
            $table->unsignedBigInteger('idProfessionals')->nullable();
            $table->enum('methodTypePaymentMethods', ['PIX', 'Conta Bancária', 'IBAN', 'MBWay', 'Cartão', 'Dinheiro'])->nullable();
            $table->boolean('isActivePaymentMethods')->nullable();
            $table->json('detailsPaymentMethods')->nullable();
            $table->timestamp('createdPaymentMethods')->nullable();

            $table->foreign('idProfessionals')->references('idProfessionals')->on('Professionals');
        });

        Schema::create('ProfessionalsCustomers', function (Blueprint $table) {
            $table->id('idProfessionalsCustomers');
            $table->unsignedBigInteger('idProfessionals')->nullable();
            $table->unsignedBigInteger('idCustomers')->nullable();
            $table->timestamp('createdProfessionalsCustomers')->nullable();

            $table->foreign('idProfessionals')->references('idProfessionals')->on('Professionals');
            $table->foreign('idCustomers')->references('idCustomers')->on('Customers');
        });

        Schema::create('SchedulingRules', function (Blueprint $table) {
            $table->id('idSchedulingRules');
            $table->integer('intervalMinutesSchedulingRules')->nullable();
            $table->integer('allowCancellationSchedulingRules')->nullable();
            $table->unsignedBigInteger('idProfessionals')->nullable();
            $table->boolean('confirmBookingsSchedulingRules')->nullable();
            $table->timestamp('createdSchedulingRules')->nullable();
            $table->integer('allowRescheduleSchedulingRules')->nullable();
            $table->timestamp('updatedSchedulingRules')->nullable();

            $table->foreign('idProfessionals')->references('idProfessionals')->on('Professionals');
        });

        Schema::create('Notifications', function (Blueprint $table) {
            $table->id('idNotifications');
            $table->unsignedBigInteger('idProfessionals')->nullable();
            $table->string('typeNotifications', 45)->nullable();
            $table->text('messageNotifications', 500)->nullable();
            $table->dateTime('sentNotifications')->nullable();
            $table->dateTime('readNotifications')->nullable();
            $table->timestamp('createdNotifications')->nullable();

            $table->foreign('idProfessionals')->references('idProfessionals')->on('Professionals');
        });

        Schema::create('Documents', function (Blueprint $table) {
            $table->id('idDocuments');
            $table->enum('typeDocuments', ['CPF', 'CNPJ', 'NIF', 'Outro'])->nullable();
            $table->unsignedBigInteger('idProfessionals')->nullable();
            $table->string('valueDocuments', 100)->nullable();
            $table->string('labelDocuments', 100)->nullable();
            $table->boolean('isPrimaryDocuments')->nullable();
            $table->boolean('verifiedDocuments')->nullable();
            $table->timestamp('createdDocuments')->nullable();
            $table->timestamp('updatedDocuments')->nullable();
            $table->unsignedBigInteger('idCustomers')->nullable();

            $table->foreign('idProfessionals')->references('idProfessionals')->on('Professionals');
            $table->foreign('idCustomers')->references('idCustomers')->on('Customers');
        });

        Schema::create('AppointmentNotes', function (Blueprint $table) {
            $table->id('idAppointmentNotes');
            $table->unsignedBigInteger('idAppointments')->nullable();
            $table->unsignedBigInteger('idProfessionals')->nullable();
            $table->text('noteAppointmentNotes', 500)->nullable();
            $table->boolean('visibleClientAppointmentNotes')->default(0);
            $table->timestamp('createdAppointmentNotes')->nullable();
            $table->timestamp('updatedAppointmentNotes')->nullable();

            $table->foreign('idAppointments')->references('idAppointments')->on('Appointments');
            $table->foreign('idProfessionals')->references('idProfessionals')->on('Professionals');
        });

        Schema::create('PasswordResetTokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('Sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Sessions');
        Schema::dropIfExists('PasswordResetTokens');
        Schema::dropIfExists('AppointmentNotes');
        Schema::dropIfExists('Documents');
        Schema::dropIfExists('Notifications');
        Schema::dropIfExists('SchedulingRules');
        Schema::dropIfExists('ProfessionalsCustomers');
        Schema::dropIfExists('PaymentMethods');
        Schema::dropIfExists('Payments');
        Schema::dropIfExists('Subscriptions');
        Schema::dropIfExists('SubscriptionPlans');
        Schema::dropIfExists('WorkingHours');
        Schema::dropIfExists('ScheduleBlocks');
        Schema::dropIfExists('ScheduleBlocksTypes');
        Schema::dropIfExists('Appointments');
        Schema::dropIfExists('Services');
        Schema::dropIfExists('ServicesTypes');
        Schema::dropIfExists('Contacts');
        Schema::dropIfExists('ContactsTypes');
        Schema::dropIfExists('Customers');
        Schema::dropIfExists('Professionals');
        Schema::dropIfExists('Users');
    }
};
