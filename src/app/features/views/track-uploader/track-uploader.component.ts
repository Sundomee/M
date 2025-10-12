import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { TrackService } from "../../../services/track.service";
import { UploadTrackRequestBody } from "../../../shared/models/track-model";

@Component({
    selector: 'dl-track-uploader',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, NgTemplateOutlet],
    templateUrl: './track-uploader.component.html',
    styleUrl: './track-uploader.component.scss',
})
export class TrackUploaderComponent {
    private readonly audio = viewChild<ElementRef<HTMLAudioElement>>('audio');

    public readonly imageSrc = signal<string>('')
    public readonly trackSrc = signal<any>(null)

    public readonly titleControl = new FormControl<string>('', Validators.required);
    public readonly descriptionControl = new FormControl<string>('');
    public audioFile: File;
    public imageFile: File;

    private readonly formData = new FormData();

    private readonly trackService = inject(TrackService);

    dropFile(event: DragEvent) {
        event.preventDefault()
        const fileInfo = event.dataTransfer.files.item(0);

        if (!fileInfo.type.includes('image')) {
            // Setta un errore!!
            return;
        }

        this.readImage(fileInfo);
    }

    dropTrack(event: DragEvent) {
        event.preventDefault();
        // Prendiamo il file
        const fileInfo = event.dataTransfer.files.item(0);

        // Controlliamo che sia un audio
        if (!fileInfo.type.includes('audio')) return

        this.readAudio(fileInfo)

    }

    imageSelected(event: Event) {
        const fileInfo = (event.target as HTMLInputElement).files.item(0);

        if (!fileInfo.type.includes('image')) {
            return;
        }

        this.readImage(fileInfo);
    }

    audioSelected(event: Event) {
        const fileInfo = (event.target as HTMLInputElement).files.item(0);

        if (!fileInfo.type.includes('audio')) {
            return;
        }

        this.readAudio(fileInfo);
    }

    readImage(file: File) {
        this.imageFile = file;
        const reader = new FileReader()

        if (this.formData.has('image')) {
            this.formData.delete('image')
        }

        this.formData.append('image', file);

        reader.onload = (event) => {
            const res = event.target.result as string;
            this.imageSrc.set(res)
        }

        reader.readAsDataURL(file);

    }

    readAudio(file: File) {
        this.audioFile = file;
        const reader = new FileReader();

        if (this.formData.has('track')) {
            this.formData.delete('track')
        }

        this.formData.append('track', file)

        reader.onload = (event) => {
            const res = event.target.result as string
            this.titleControl.setValue(file.name.split('.').shift())

            this.trackSrc.set(res)

        }

        reader.readAsDataURL(file)
    }

    play() {
        this.audio().nativeElement.loop = true;
        this.audio().nativeElement.play();
    }

    async upload() {
        const title = this.titleControl.value;
        const description = this.descriptionControl.value;

        const { size } = this.audioFile;

        if (!this.formData.has('track') || !this.formData.has('image')) {
            return;
        }

        this.formData.append('metadata', JSON.stringify(
            {
                title,
                description,
                size,
            }
        ))

        const res = await this.trackService.uploadTrack(this.formData)
        console.log(res);

    }
}